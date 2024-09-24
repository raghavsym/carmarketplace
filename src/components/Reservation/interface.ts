import { IReservationModel, reservationStatusEnum } from './model';
import { Request } from 'express';

/**
 * @export
 * @interface IReservationModel
 */
export interface IReservationService {

    /**
     * @param {IReservationModel} IReservation
     * @returns {Promise<IReservationModel>}
     * @memberof IReservationService
     */
    reservation(reservation: any): Promise<IReservationModel>;

    /**
     * @param Request
     * @returns {Promise<IMyBookingsModel>}
     * @memberof IReservationService
     */
    
    myBookings(renterId: string): Promise<IReservationModel[]>;
}

/**
 * @export
 * @interface IReservation
 */
export interface IReservation {
    carId: string,
    renterId: string,
    userId?: string,
    reservationStartDate: Date,
    reservationEndDate: Date,
    pickupLocation: string,
    dropoffLocation: string,
    status: reservationStatusEnum // 0 completed, 1 cancelled, 2 active
}
