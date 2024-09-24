import { Document, Mongoose, Schema } from "mongoose";
import * as connections from "../../config/connection/connection";

export enum reservationStatusEnum {
  COMPLETED = 0,
  CANCELLED = 1,
  ACTIVE = 2,
}
/**
 * @export
 * @interface IReservationModel
 * @extends {Document}
 */
export interface IReservationModel extends Document {
  carId: any;
  renterId: any;
  reservationStartDate: Date;
  reservationEndDate: Date;
  pickupLocation: string;
  dropoffLocation: string;
  status: reservationStatusEnum;
}

const ReservationSchema: Schema = new Schema(
  {
    carId: { type: Schema.Types.ObjectId, ref: "Cars" },
    renterId: { type: Schema.Types.ObjectId, ref: "Users" },
    reservationStartdate: Date,
    reservationEndDate: Date,
    pickupLocation: String,
    dropoffLocation: String,
    status: Number,
  },
  {
    collection: "reservations",
    strict: false,
    timestamps: true,
  }
);

export default connections.db.model<IReservationModel>("Reservations", ReservationSchema);
