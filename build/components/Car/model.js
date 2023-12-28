"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
const CarSchema = new mongoose_1.Schema({
    carModel: String,
    carPrice: Number,
    carPicture: String,
    availableDateRange: [{
            startDate: Date,
            endDate: Date
        }],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
}, {
    collection: 'cars',
    versionKey: false,
    timestamps: true
});
exports.default = connections.db.model('Cars', CarSchema);
//# sourceMappingURL=model.js.map