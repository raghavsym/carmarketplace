"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class ReservationValidation
 * @extends Validation
 */
class ReservationValidation extends validation_1.default {
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
    reservation(params) {
        const schema = Joi.object().keys({
            carId: Joi.string().required(),
            renterId: Joi.string().required(),
            reservationStartDate: Joi.date().iso().required(),
            reservationEndDate: Joi.date().iso().greater(Joi.ref('reservationStartDate')).required(),
            status: Joi.number().required()
        });
        return schema.validate(params);
    }
}
exports.default = new ReservationValidation();
//# sourceMappingURL=validation.js.map