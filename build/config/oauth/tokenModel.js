"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../connection/connection");
const TokenSchema = new mongoose_1.Schema({
    accessToken: {
        type: String,
        required: true,
    },
    accessTokenExpiresAt: {
        type: Date,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    refreshTokenExpiresAt: {
        type: Date,
    },
    scope: {
        type: String,
    },
    client: {
        type: Object,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
});
exports.default = connections.db.model('TokenModel', TokenSchema);
//# sourceMappingURL=tokenModel.js.map