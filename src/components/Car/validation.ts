import * as Joi from 'joi';
import Validation from '../validation';
import { ICarModel, DateRange } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class CarValidation extends Validation {
    /**
     * Creates an instance of CarValidation.
     * @memberof CarValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {ICarModel} params
     * @returns {Joi.ValidationResult}
     * @memberof CarValidation
     */
    createCar(
        params: ICarModel,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            carModel: Joi.string().required(),
            carPrice: Joi.number().required(),
            carPicture: Joi.string().allow(null, ''),
            userId: Joi.string().required()
        });

        return schema.validate(params);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CarValidation
     */
    getCar(
        body: {
            id: string
        },
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CarValidation
     */
    dateRange(
        body: {
            startDate: Date,
            endDate: Date
        },
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            startDate: Joi.date().iso().required(),
            endDate: Joi.date().iso().greater(Joi.ref('startDate')).required()
        });

        return schema.validate(body);
    }
}

export default new CarValidation();
