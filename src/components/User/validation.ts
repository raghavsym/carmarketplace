import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
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
    createUser(
        params: IUserModel,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
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
    getUser(
        body: {
            id: string
        },
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required(),
        });

        return schema.validate(body);
    }

}

export default new UserValidation();
