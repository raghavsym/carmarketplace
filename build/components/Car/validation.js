"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class CarValidation extends validation_1.default {
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
    createCar(params) {
        const schema = Joi.object().keys({
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
    getCar(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });
        return schema.validate(body);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CarValidation
     */
    dateRange(body) {
        const schema = Joi.object().keys({
            startDate: Joi.date().iso().required(),
            endDate: Joi.date().iso().greater(Joi.ref('startDate')).required()
        });
        return schema.validate(body);
    }
}
exports.default = new CarValidation();
//# sourceMappingURL=validation.js.map