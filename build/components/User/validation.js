"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends validation_1.default {
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    createUser(params) {
        const schema = Joi.object().keys({
            email: Joi.string().email({
                minDomainSegments: 2,
            }).required(),
            profile: {
                name: Joi.string().required(),
                gender: Joi.string().required(),
                location: Joi.string().required(),
                picture: Joi.string().allow(null, ''),
            },
            cars: Joi.array().items(Joi.object())
        });
        return schema.validate(params);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });
        return schema.validate(body);
    }
}
exports.default = new UserValidation();
//# sourceMappingURL=validation.js.map