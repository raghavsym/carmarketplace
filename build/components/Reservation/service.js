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
const model_1 = require("./model");
const validation_1 = require("./validation");
const axios_1 = require("axios");
const RedisClient_1 = require("../../services/RedisClient");
const instance = axios_1.default.create({
    baseURL: process.env.CAR_AVAILABILITY_URL,
    timeout: 15000,
});
/**
 * @export
 * @implements {IReservationModelService}
 */
const UserService = {
    /**
     * @param {IReservationModel} bookingData
     * @returns {Promise < IReservationModel >}
     * @memberof ReservationService
     */
    reservation(bookingData, carId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reservationData = {
                    carId: carId,
                    renterId: bookingData.renterId,
                    reservationStartDate: new Date(bookingData.reservationStartDate),
                    reservationEndDate: new Date(bookingData.reservationEndDate),
                    status: model_1.reservationStatusEnum.ACTIVE, // 0 completed, 1 cancelled, 2 active
                };
                const validate = validation_1.default.reservation(reservationData);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                // Step 1:
                const reservation = yield model_1.default.create(reservationData);
                const carAvailabilityData = {
                    carId: reservation.carId,
                    userId: bookingData.userId,
                    renterId: reservation.renterId,
                    bookedStartDate: reservation.reservationStartDate,
                    bookedEndDate: reservation.reservationEndDate,
                };
                // Step 2: clear cache
                (0, RedisClient_1.clearCache)(bookingData.userId);
                // Step 3: update car availability
                yield instance.post("/setCarAvailability", carAvailabilityData);
                return reservation;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
};
exports.default = UserService;
//# sourceMappingURL=service.js.map