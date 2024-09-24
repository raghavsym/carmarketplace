import * as Joi from "joi";
import ReservationModel, {
  IReservationModel,
  reservationStatusEnum,
} from "./model";
import ReservationValidation from "./validation";
import { IReservationService, IReservation } from "./interface";
import axios, { AxiosResponse } from "axios";
import { clearCache } from "../../services/RedisClient";
import { Request } from 'express';

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 15000,
});

/**
 * @export
 * @implements {IReservationModelService}
 */
const ReservationService: IReservationService = {
  /**
   * @param {IReservationModel}
   * @returns {Promise < IReservationModel >}
   * @memberof ReservationService
   */
  async reservation(req: any): Promise<IReservationModel> {
    try {
      const reservationData: IReservation = {
        carId: req.body.carId,
        renterId: req.user.userId,
        reservationStartDate: new Date(req.body.reservationStartDate),
        reservationEndDate: new Date(req.body.reservationEndDate),
        pickupLocation: req.body.pickupLocation,
        dropoffLocation: req.body.dropoffLocation,
        status: reservationStatusEnum.ACTIVE, // 0 completed, 1 cancelled, 2 active
      };
      const validate: Joi.ValidationResult =
        ReservationValidation.reservation(reservationData);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      // Step 1:
      const reservation: IReservationModel = await ReservationModel.create(
        reservationData
      );

      const carAvailabilityData: any = {
        carId: reservation.carId,
        userId: req.body.userId,
        renterId: reservation.renterId,
        bookedStartDate: reservation.reservationStartDate,
        bookedEndDate: reservation.reservationEndDate,
      };

      // Step 2: clear cache
      // clearCache(bookingData.userId)

      // Step 3: update car availability
      // console.log("set api call")
      await axios.post("http://localhost:3001/v1/availability/setCarAvailability", carAvailabilityData);

      return reservation;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {Request}
   * @returns {Promise < IReservationModel >}
   * @memberof ReservationService
   */

  async myBookings(renterId: string): Promise<IReservationModel[]> {
    try{
      const bookings: any = await ReservationModel.find({renterId})
      .populate({path: "renterId", select: 'name location'})
      .populate({path: "carId", select: 'carModel carPrice carPicture'});
      return bookings;
    }catch(error){
    }
  }
};

export default ReservationService;
