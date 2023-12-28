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
exports.create = exports.findOne = exports.setCarAvailability = exports.findAllByFilter = exports.findAll = void 0;
const service_1 = require("./service");
const error_1 = require("../../config/error");
const service_2 = require("../User/service");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cars = yield service_1.default.findAll(req.body.userId);
            res.status(200).json(cars);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findAll = findAll;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function findAllByFilter(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cars = yield service_1.default.findAllByFilter(req.body);
            res.status(200).json(cars);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findAllByFilter = findAllByFilter;
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
            const cars = yield service_1.default.setCarAvailability(req.body, req.params.id);
            res.status(200).json(cars);
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
function findOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const car = yield service_1.default.findOne(req.params.id);
            res.status(200).json(car);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.findOne = findOne;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const car = yield service_1.default.insert(req.body);
            yield service_2.default.findOne(req.body.userId)
                .then((user) => {
                user.cars.push(car._id);
                user.save();
            });
            res.status(201).json(car);
        }
        catch (error) {
            next(new error_1.HttpError(error.message.status, error.message));
        }
    });
}
exports.create = create;
//# sourceMappingURL=index.js.map