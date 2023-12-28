import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel } from '../User/model';

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * Creates an instance of AuthValidation.
     * @memberof AuthValidation
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
            password: Joi.string().required(),
            name: Joi.string().required(),
            gender: Joi.string().required(),
            location: Joi.string().required(),
            picture: Joi.string().allow(null, ''),
            cars: Joi.array().items(Joi.object())
        });

        return schema.validate(params);
    }
    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    getUser(
        params: IUserModel,
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            response_type: Joi.string(),
            state: Joi.string(),
            client_id: Joi.string(),
            password: Joi.string().required(),
            email: Joi.string().email({
                minDomainSegments: 2,
            }).required(),
        });

        return schema.validate(params);
    }
}

export default new AuthValidation();