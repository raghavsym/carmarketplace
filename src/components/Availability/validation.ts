import * as Joi from 'joi';
import Validation from '../validation';
import { ICarAvailabilityModel, IBookedSlot } from './model';
import { ICarAvailability } from './interface';

/**
 * @export
 * @class ReservationValidation
 * @extends Validation
 */
class CarAvailabilityValidation extends Validation {
    /**
     * Creates an instance of CarAvailabilityValidation.
     * @memberof CarAvailabilityValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IBookedSlot} body
     * @returns {Joi.ValidationResult}
     * @memberof CarAvailabilityValidation
     */
    availability(
        body: IBookedSlot,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            renterId: Joi.string().required(),
            bookedStartDate: Joi.date().iso().required(),
            bookedEndDate: Joi.date().iso().greater(Joi.ref('bookedStartDate')).required(),
            status: Joi.boolean().required()
        });
        return schema.validate(body);
    }

}

export default new CarAvailabilityValidation();
