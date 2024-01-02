import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';
import * as connections from '../../config/connection/connection';

export type DateRange = {
    startDate: Date,
    endDate: Date
}

/**
 * @export
 * @interface ICarModel
 * @extends {Document}
 */
export interface ICarModel extends Document {
    carModel: string;
    carPrice: number;
    carPicture: string;
    availableDateRange?: DateRange[]
}

const CarSchema: Schema = new Schema({
    carModel: String,
    carPrice: Number,
    carPicture: String,
    availableDateRange: [{
        startDate: Date,
        endDate: Date
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
}, {
    collection: 'cars',
    versionKey: false,
    timestamps: true
});

export default connections.db.model< ICarModel >('Cars', CarSchema);
