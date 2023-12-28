"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class ReservationValidation
 * @extends Validation
 */
class CarAvailabilityValidation extends validation_1.default {
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
    availability(body) {
        const schema = Joi.object().keys({
            renterId: Joi.string().required(),
            bookedStartDate: Joi.date().iso().required(),
            bookedEndDate: Joi.date().iso().greater(Joi.ref('bookedStartDate')).required(),
            status: Joi.boolean().required()
        });
        return schema.validate(body);
    }
}
exports.default = new CarAvailabilityValidation();
//# sourceMappingURL=validation.js.map