"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarAvailability = exports.setCarAvailability = void 0;
const service_1 = require("./service");
const error_1 = require("../../config/error");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function setCarAvailability(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reservation = yield service_1.default.setCarAvailability(req.body);
            res.status(200).json(reservation);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.setCarAvailability = setCarAvailability;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function getCarAvailability(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reservation = yield service_1.default.getCarAvailability(req.body);
            res.status(200).json(reservation);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.getCarAvailability = getCarAvailability;
//# sourceMappingURL=index.js.map