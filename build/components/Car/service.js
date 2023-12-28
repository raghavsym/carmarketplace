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
const mongoose_1 = require("mongoose");
const model_1 = require("./model");
const validation_1 = require("./validation");
/**
 * @export
 * @implements {ICarModelService}
 */
const CarService = {
    /**
     * @returns {Promise < ICarModel[] >}
     * @memberof CarService
     */
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.find({ userId: { $ne: userId } }).select([
                    "carModel",
                    "carPrice",
                    "carPicture",
                ]);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @returns {Promise < ICarModel[] >}
     * @memberof CarService
     */
    findAllByFilter(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subQuery = [
                    {
                        $match: {
                            $and: [{ userId: { $ne: body.userId } }],
                        },
                    },
                ];
                if (body && body.carModel) {
                    subQuery[0]["$match"]["$and"].push({ carModel: body.carModel });
                }
                if (body && body.price) {
                    subQuery[0]["$match"]["$and"].push({
                        carPrice: { $lte: body.price.end, $gte: body.price.start },
                    });
                }
                return yield model_1.default.aggregate(subQuery);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < ICarModel >}
     * @memberof CarService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.getCar({
                    id,
                });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                return yield model_1.default.findOne({
                    _id: new mongoose_1.Types.ObjectId(id),
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ICArModel} car
     * @returns {Promise < ICarModel >}
     * @memberof CarService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // body["availableDateRange"] = [];
                const validate = validation_1.default.createCar(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield model_1.default.create(body);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < ICarModel >}
     * @memberof CarService
     */
    setCarAvailability(body, carId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dateRange = {
                    startDate: new Date(body.startDate),
                    endDate: new Date(body.endDate),
                };
                const validate = validation_1.default.dateRange(dateRange);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const car = yield CarService.findOne(carId).then((car) => {
                    car.availableDateRange.push(dateRange);
                    car.save();
                    return car;
                });
                return car;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = CarService;
//# sourceMappingURL=service.js.map