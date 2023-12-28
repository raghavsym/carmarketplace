"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../connection/connection");
const AuthCodeSchema = new mongoose_1.Schema({
    authorizationCode: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    redirectUri: {
        type: String,
        required: true,
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
exports.default = connections.db.model('AuthCodeModel', AuthCodeSchema);
//# sourceMappingURL=authCodeModel.js.map