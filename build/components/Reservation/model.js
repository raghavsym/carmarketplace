"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationStatusEnum = void 0;
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
var reservationStatusEnum;
(function (reservationStatusEnum) {
    reservationStatusEnum[reservationStatusEnum["COMPLETED"] = 0] = "COMPLETED";
    reservationStatusEnum[reservationStatusEnum["CANCELLED"] = 1] = "CANCELLED";
    reservationStatusEnum[reservationStatusEnum["ACTIVE"] = 2] = "ACTIVE";
})(reservationStatusEnum = exports.reservationStatusEnum || (exports.reservationStatusEnum = {}));
const ReservationSchema = new mongoose_1.Schema({
    carId: String,
    renterId: String,
    reservationStartdate: Date,
    reservationEndDate: Date,
    status: Number
}, {
    collection: 'reservations',
    strict: false,
    timestamps: true
});
exports.default = connections.db.model('Reservations', ReservationSchema);
//# sourceMappingURL=model.js.map