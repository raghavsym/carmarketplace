import * as Joi from "joi";
import { Types } from "mongoose";
import CarAvailabilityValidation from "./validation";
import CarAvailabilityModel, {
  ICarAvailabilityModel,
  IBookedSlot,
} from "./model";
import { ICarAvailabilityService, IDateRange, IFilteredCar } from "./interface";
import CarModel from "../Car/model";
import { setCache } from '../../services/RedisClient';


/**
 * @export
 * @implements {ICarAvailabilityService}
 */
const UserService: ICarAvailabilityService = {
  /**
   * @param {ICarAvailabilityModel} bookingData
   * @returns {Promise < ICarAvailabilityModel >}
   * @memberof CarAvailabilityService
   */
  async setCarAvailability(bookingData: any): Promise<ICarAvailabilityModel> {
    try {
      const carId: string = bookingData.carId;
      const bookedSlot: IBookedSlot = {
        renterId: bookingData.renterId,
        bookedStartDate: new Date(bookingData.bookedStartDate),
        bookedEndDate: new Date(bookingData.bookedEndDate),
        status: true, // true active, false Done
      };

      let reservationData: any = {
        carId: bookingData.carId,
        userId: bookingData.userId,
        bookedSlot: [bookedSlot],
      };

      const validate: Joi.ValidationResult =
        CarAvailabilityValidation.availability(bookedSlot);

      if (validate.error) {
        throw new Error(validate.error.message);
      }
      return await CarAvailabilityModel.findOne({ carId }).then(
        async (booking) => {
          if (booking && Object.keys(booking).length !== 0) {
            booking.bookedSlot.push(bookedSlot);
            booking.save();
            return booking;
          }
          return await CarAvailabilityModel.create(reservationData);
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  //  /**
  //  * @param {ICarAvailabilityModel} bookingData
  //  * @returns {Promise < ICarAvailabilityModel >}
  //  * @memberof CarAvailabilityService
  //  */
  async getCarAvailability(dateRange: IDateRange): Promise<any> {
    try {
      // STEP 1:
      const query = [
        { $unwind: "$availableDateRange" },
        {
          $match: {
              $and: [
                {$and: [{"availableDateRange.startDate": {$lt: new Date(dateRange.endDate),},},{"availableDateRange.startDate": {$lt: new Date(dateRange.startDate),},},],},
                {$and: [{"availableDateRange.endDate": {$gt: new Date(dateRange.endDate),},},{"availableDateRange.endDate": {$gt: new Date(dateRange.startDate),},},],},],
          },
        },
      ];
      const availableCars: any = await CarModel.aggregate(query);

      // STEP 2:
      const availableCarsIds = availableCars.map((obj: any) => {
        return obj._id.valueOf();
      });
      console.log(availableCarsIds);
      if (availableCars?.availableDateRange?.length === 0) {
        return {
          message: "No car available currently.",
        };
      }

      const availQuery = [
        // {"$unwind": "$bookedSlot"},
        {
          $match: {
            $and: [
              { carId: { $in: availableCarsIds } },
              {
                $or: [
                  {$and: [{"bookedSlot.bookedStartDate": {$gt: new Date(dateRange.startDate),},},{"bookedSlot.bookedStartDate": {$lte: new Date(dateRange.endDate),},},],},
                  {$and: [{"bookedSlot.bookedEndDate": {$gt: new Date(dateRange.startDate),},},{"bookedSlot.bookedEndDate": {$lte: new Date(dateRange.endDate),},},],},
                  {$and: [{"bookedSlot.bookedStartDate": {$lte: new Date(dateRange.startDate),},},{"bookedSlot.bookedEndDate": {$lt: new Date(dateRange.endDate),},},],},
                  {$and: [{"bookedSlot.bookedStartDate": {$gte: new Date(dateRange.startDate),},},{"bookedSlot.bookedEndDate": {$gt: new Date(dateRange.endDate),},},],},
                  {$and: [{"bookedSlot.bookedStartDate": {$lt: new Date(dateRange.startDate),},},{"bookedSlot.bookedEndDate": {$gt: new Date(dateRange.endDate),},},],},],
              },
            ],
          },
        },
        {
          $project: {
            carId: 1,
          },
        },
      ];
      const isAvailable: any = await CarAvailabilityModel.aggregate(availQuery);

      // STEP 3:
      if (isAvailable?.length > 0) {
        const availableFilteredData =  availableCars.filter((obj: any) => {
          let found = isAvailable.find((avail: any) => {
            let _id = obj._id.valueOf();
            return avail.carId === _id;
          });
          if (found) {
            return true;
          }
          return false;
        });
        // Caching data
        await setCache( dateRange.userId, availableFilteredData);
        // const products = await cache.set(dateRange.userId, availableFilteredData)
        return availableFilteredData;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};


export default UserService;
