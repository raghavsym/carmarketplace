"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../connection/connection");
const ClientSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    secret: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['confidential', 'public'],
        default: 'confidential',
    },
    redirectUris: {
        type: Array,
        required: true,
    },
    grants: {
        type: Array,
        required: true,
    },
    key: {
        type: String,
    },
});
exports.default = connections.db.model('ClientModel', ClientSchema);
//# sourceMappingURL=clientModel.js.map