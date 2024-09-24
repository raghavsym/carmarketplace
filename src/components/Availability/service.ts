import * as Joi from "joi";
import { Types } from "mongoose";
import CarAvailabilityValidation from "./validation";
import CarAvailabilityModel, {
  ICarAvailabilityModel,
  IBookedSlot,
} from "./model";
import { ICarAvailabilityService, IDateRange, IFilteredCar } from "./interface";
import CarModel from "../Car/model";
import { setCache } from "../../services/RedisClient";
import { pipeline } from "stream";

/**
 * @export
 * @implements {ICarAvailabilityService}
 */
const CarAvailabilityService: ICarAvailabilityService = {
  /**
   * @param {ICarAvailabilityModel}
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

  async getCarAvailability(dateRange: IDateRange): Promise<any> {
    const endDate = new Date(dateRange.endDate);
    const startDate = new Date(dateRange.startDate);

    try {
      // STEP 1: Get the all available cars within range
      
      const query = [
        {
          // Step 1: Lookup to join caravailability collection
          $lookup: {
            from: "caravailability",
            localField: "_id",
            foreignField: "carId",
            as: "bookedCarDetails"
          }
        },
        {
          // Step 2: Match to filter cars by available date range
          $match: {
            "availableDateRange.startDate": { $lte: startDate},
            "availableDateRange.endDate": { $gte: endDate }
          }
        },
        // Step 3: Add a field to check if the car is booked within the requested range
        {
          $match: {
            "bookedCarDetails.bookedSlot": {
              $not: {
                $elemMatch: {
                  $and: [
                    { bookedStartDate: { $lte: endDate } }, // Booking starts before or on requestEndDate
                    { bookedEndDate: { $gte: startDate } }, // Booking ends after or on requestStartDate
                  ],
                },
              },
            },
          },
        },
        {
          // Step 4: Project relevant fields
          $project: {
            carModel: 1,
            carPrice: 1,
            carPicture: 1,
            availableDateRange: 1,
            bookedCarDetails: 1
          }
        }
      ] 
      return await CarModel.aggregate(query);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  //  /**
  //  * @param {ICarAvailabilityModel} bookingData
  //  * @returns {Promise < ICarAvailabilityModel >}
  //  * @memberof CarAvailabilityService
  //  */
  // async getCarAvailability(dateRange: IDateRange): Promise<any> {
  //   const endDate = new Date(dateRange.endDate);
  //   const startDate = new Date(dateRange.startDate);

  //   try {
  //     // STEP 1: Get the all available cars within range
      
  //     const query = [
  //       {
  //         // Step 1: Lookup to join caravailability collection
  //         $lookup: {
  //           from: "caravailability",
  //           localField: "_id",
  //           foreignField: "carId",
  //           as: "availabilityDetails"
  //         }
  //       },
  //       {
  //         // Step 2: Match to filter cars by available date range
  //         $match: {
  //           "availableDateRange.startDate": { $lte: startDate},
  //           "availableDateRange.endDate": { $gte: endDate }
  //         }
  //       },
  //       // {
  //       //   // Step 2: Unwind the availabilityDetails array
  //       //   $unwind: {
  //       //     path: "$availabilityDetails",
  //       //     preserveNullAndEmptyArrays: true // in case no bookings exist
  //       //   }
  //       // },
  //       // Step 3: Add a field to check if the car is booked within the requested range
  //       {
  //         $match: {
  //           "availabilityDetails.bookedSlot": {
  //             $not: {
  //               $elemMatch: {
  //                 $and: [
  //                   { bookedStartDate: { $lte: endDate } }, // Booking starts before or on requestEndDate
  //                   { bookedEndDate: { $gte: startDate } }, // Booking ends after or on requestStartDate
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       },
  //       // {
  //       //   // Step 4: Project relevant fields
  //       //   $project: {
  //       //     carModel: 1,
  //       //     carPrice: 1,
  //       //     availableDateRange: 1,
  //       //     availabilityDetails: 1
  //       //   }
  //       // }
  //     ]
      
  //     const availableCars: any = CarModel.aggregate(query);

  //     // STEP 2:
  //     // const availableCarsIds = availableCars.map((obj: any) => {
  //     //   return obj._id.valueOf();
  //     // });

  //     // if (availableCars?.availableDateRange?.length === 0) {
  //     //   return {
  //     //     message: "No car available currently.",
  //     //   };
  //     // }
  //     // console.log('availableCars', availableCars)

  //     // const availQuery = [
  //     //   { $match: { carId: { $in: availableCarsIds } } },
  //     //   {
  //     //     $match: {
  //     //       bookedSlot: {
  //     //         $not: {
  //     //           $elemMatch: {
  //     //             $and: [
  //     //               { bookedStartDate: { $lt: endDate } }, // Booking starts before or on requestEndDate
  //     //               { bookedEndDate: { $gt: startDate } }, // Booking ends after or on requestStartDate
  //     //             ],
  //     //           },
  //     //         },
  //     //       },
  //     //     },
  //     //   },
  //     //   // {
  //     //   //   $project: {
  //     //   //     carId: 1,
  //     //   //   },
  //     //   // },
  //     // ];

  //     // const isAvailable: any = await CarAvailabilityModel.aggregate(availQuery); //b
  //     // console.log("isAvailable",isAvailable)
  //     // STEP 3:
  //     // if (isAvailable?.length > 0) {
  //     //   const availableFilteredData = availableCars.filter((obj: any) => {
  //     //     isAvailable.find((avail: any) => {
  //     //       let _id = obj._id.valueOf();
  //     //       if(avail.carId === _id){
  //     //         obj['availableDateRange'] = {
  //     //           startDate: startDate,
  //     //           endDate: endDate
  //     //         }
  //     //       }
  //     //     });
  //     //     return true;
  //         // if (found) {
  //         //   obj['availableDateRange'] = {
  //         //     startDate: avail["bookedSlot"].
  //         //     endDate: 
  //         //   }
  //         //   return true;
  //         // }
  //         // return true;
  //       // });
  //       // Caching data
  //       // await setCache( dateRange.userId, availableFilteredData);
  //       // const products = await cache.set(dateRange.userId, availableFilteredData)
  //       return availableCars;
  //     // } else {
  //     //   return [];
  //     // }
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // },
};

export default CarAvailabilityService;
