import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection/connection';

export enum reservationStatusEnum {
    COMPLETED = 0,
    CANCELLED = 1,
    ACTIVE    = 2
}
/**
 * @export
 * @interface IReservationModel
 * @extends {Document}
 */
export interface IReservationModel extends Document {
    carId: string;
    renterId: string;
    reservationStartDate: Date;
    reservationEndDate: Date;
    status: reservationStatusEnum;
}

const ReservationSchema: Schema = new Schema({
    carId: String,
    renterId: String,
    reservationStartdate: Date,
    reservationEndDate: Date,
    status: Number
}, {
    collection: 'reservations',
    strict: false,
    timestamps: true
});

export default connections.db.model< IReservationModel >('Reservations', ReservationSchema);
