import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection/connection';


export interface IBookedSlot {
    renterId: string;
    bookedStartDate: Date;
    bookedEndDate: Date;
    status: boolean;
}
/**
 * @export
 * @interface ICarAvailabilityModel
 * @extends {Document}
 */
export interface ICarAvailabilityModel extends Document {
    carId: string;
    userId: string;
    bookedSlot: IBookedSlot[]
}

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *    UserSchema:
//  *      required:
//  *        - email
//  *        - name
//  *      properties:
//  *        id:
//  *          type: string
//  *        name:
//  *          type: string
//  *        email:
//  *          type: string
//  *        password:
//  *          type: string
//  *        passwordResetToken:
//  *          type: string
//  *        passwordResetExpires:
//  *          type: string
//  *          format: date
//  *        tokens:
//  *          type: array
//  *    Users:
//  *      type: array
//  *      items:
//  *        $ref: '#/components/schemas/UserSchema'
//  */
const CarAvailabilitySchema: Schema = new Schema({
    carId: String,
    userId: String,
    bookedSlot: [{
        renterId: String,
        bookedStartDate: Date,
        bookedEndDate: Date,
        status: Boolean
    }],
}, {
    collection: 'caravailability',
    versionKey: false,
});

export default connections.db.model< ICarAvailabilityModel >('Caravailability', CarAvailabilitySchema);
