import { IReservationModel, reservationStatusEnum } from './model';

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
    reservation(reservation: IReservation, carId: string): Promise<IReservationModel>;
    
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
    status: reservationStatusEnum // 0 completed, 1 cancelled, 2 active
}
