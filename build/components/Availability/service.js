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
const validation_1 = require("./validation");
const model_1 = require("./model");
const model_2 = require("../Car/model");
const RedisClient_1 = require("../../services/RedisClient");
/**
 * @export
 * @implements {ICarAvailabilityService}
 */
const UserService = {
    /**
     * @param {ICarAvailabilityModel} bookingData
     * @returns {Promise < ICarAvailabilityModel >}
     * @memberof CarAvailabilityService
     */
    setCarAvailability(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carId = bookingData.carId;
                const bookedSlot = {
                    renterId: bookingData.renterId,
                    bookedStartDate: new Date(bookingData.bookedStartDate),
                    bookedEndDate: new Date(bookingData.bookedEndDate),
                    status: true, // true active, false Done
                };
                let reservationData = {
                    carId: bookingData.carId,
                    userId: bookingData.userId,
                    bookedSlot: [bookedSlot],
                };
                const validate = validation_1.default.availability(bookedSlot);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                return yield model_1.default.findOne({ carId }).then((booking) => __awaiter(this, void 0, void 0, function* () {
                    if (booking && Object.keys(booking).length !== 0) {
                        booking.bookedSlot.push(bookedSlot);
                        booking.save();
                        return booking;
                    }
                    return yield model_1.default.create(reservationData);
                }));
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    //  /**
    //  * @param {ICarAvailabilityModel} bookingData
    //  * @returns {Promise < ICarAvailabilityModel >}
    //  * @memberof CarAvailabilityService
    //  */
    getCarAvailability(dateRange) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // STEP 1:
                const query = [
                    { $unwind: "$availableDateRange" },
                    {
                        $match: {
                            $and: [
                                { $and: [{ "availableDateRange.startDate": { $lt: new Date(dateRange.endDate), }, }, { "availableDateRange.startDate": { $lt: new Date(dateRange.startDate), }, },], },
                                { $and: [{ "availableDateRange.endDate": { $gt: new Date(dateRange.endDate), }, }, { "availableDateRange.endDate": { $gt: new Date(dateRange.startDate), }, },], },
                            ],
                        },
                    },
                ];
                const availableCars = yield model_2.default.aggregate(query);
                // STEP 2:
                const availableCarsIds = availableCars.map((obj) => {
                    return obj._id.valueOf();
                });
                console.log(availableCarsIds);
                if (((_a = availableCars === null || availableCars === void 0 ? void 0 : availableCars.availableDateRange) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    return {
                        message: "No car available currently.",
                    };
                }
                const availQuery = [
                    // {"$unwind": "$bookedSlot"},
                    {
                        $match: {
                            $and: [
                                { carId: { $in: availableCarsIds } },
                                {
                                    $or: [
                                        { $and: [{ "bookedSlot.bookedStartDate": { $gt: new Date(dateRange.startDate), }, }, { "bookedSlot.bookedStartDate": { $lte: new Date(dateRange.endDate), }, },], },
                                        { $and: [{ "bookedSlot.bookedEndDate": { $gt: new Date(dateRange.startDate), }, }, { "bookedSlot.bookedEndDate": { $lte: new Date(dateRange.endDate), }, },], },
                                        { $and: [{ "bookedSlot.bookedStartDate": { $lte: new Date(dateRange.startDate), }, }, { "bookedSlot.bookedEndDate": { $lt: new Date(dateRange.endDate), }, },], },
                                        { $and: [{ "bookedSlot.bookedStartDate": { $gte: new Date(dateRange.startDate), }, }, { "bookedSlot.bookedEndDate": { $gt: new Date(dateRange.endDate), }, },], },
                                        { $and: [{ "bookedSlot.bookedStartDate": { $lt: new Date(dateRange.startDate), }, }, { "bookedSlot.bookedEndDate": { $gt: new Date(dateRange.endDate), }, },], },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        $project: {
                            carId: 1,
                        },
                    },
                ];
                const isAvailable = yield model_1.default.aggregate(availQuery);
                // STEP 3:
                if ((isAvailable === null || isAvailable === void 0 ? void 0 : isAvailable.length) > 0) {
                    const availableFilteredData = availableCars.filter((obj) => {
                        let found = isAvailable.find((avail) => {
                            let _id = obj._id.valueOf();
                            return avail.carId === _id;
                        });
                        if (found) {
                            return true;
                        }
                        return false;
                    });
                    // Caching data
                    yield (0, RedisClient_1.setCache)(dateRange.userId, availableFilteredData);
                    // const products = await cache.set(dateRange.userId, availableFilteredData)
                    return availableFilteredData;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = UserService;
//# sourceMappingURL=service.js.map