import * as Joi from "joi";
import ReservationModel, {
  IReservationModel,
  reservationStatusEnum,
} from "./model";
import ReservationValidation from "./validation";
import { IReservationService, IReservation } from "./interface";
import axios, { AxiosResponse } from "axios";
import { clearCache } from '../../services/RedisClient';


const instance = axios.create({
  baseURL: process.env.CAR_AVAILABILITY_URL,
  timeout: 15000,
});

/**
 * @export
 * @implements {IReservationModelService}
 */
const UserService: IReservationService = {
  /**
   * @param {IReservationModel} bookingData
   * @returns {Promise < IReservationModel >}
   * @memberof ReservationService
   */
  async reservation(
    bookingData: IReservation,
    carId: string
  ): Promise<IReservationModel> {
    try {
      const reservationData: IReservation = {
        carId: carId,
        renterId: bookingData.renterId,
        reservationStartDate: new Date(bookingData.reservationStartDate),
        reservationEndDate: new Date(bookingData.reservationEndDate),
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
        userId: bookingData.userId,
        renterId: reservation.renterId,
        bookedStartDate: reservation.reservationStartDate,
        bookedEndDate: reservation.reservationEndDate,
      };

      // Step 2: clear cache
      clearCache(bookingData.userId)

      // Step 3: update car availability
      await instance.post("/setCarAvailability", carAvailabilityData);

      return reservation;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UserService;
