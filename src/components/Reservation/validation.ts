import * as Joi from 'joi';
import Validation from '../validation';
import { IReservationModel } from './model';
import { IReservation } from './interface';

/**
 * @export
 * @class ReservationValidation
 * @extends Validation
 */
class ReservationValidation extends Validation {
    /**
     * Creates an instance of ReservationValidation.
     * @memberof ReservationValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IReservation} params
     * @returns {Joi.ValidationResult}
     * @memberof ReservationValidation
     */
    reservation(
        params: IReservation,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            carId: Joi.string().required(),
            renterId: Joi.string().required(),
            reservationStartDate: Joi.date().iso().required(),
            reservationEndDate: Joi.date().iso().greater(Joi.ref('reservationStartDate')).required(),
            status: Joi.number().required()
        });
        return schema.validate(params);
    }

}

export default new ReservationValidation();
