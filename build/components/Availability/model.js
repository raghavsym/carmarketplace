"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *    UserSchema:
//  *      required:
//  *        - email
//  *        - name
//  *      properties:
//  *        id:
//  *          type: string
//  *        name:
//  *          type: string
//  *        email:
//  *          type: string
//  *        password:
//  *          type: string
//  *        passwordResetToken:
//  *          type: string
//  *        passwordResetExpires:
//  *          type: string
//  *          format: date
//  *        tokens:
//  *          type: array
//  *    Users:
//  *      type: array
//  *      items:
//  *        $ref: '#/components/schemas/UserSchema'
//  */
const CarAvailabilitySchema = new mongoose_1.Schema({
    carId: String,
    userId: String,
    bookedSlot: [{
            renterId: String,
            bookedStartDate: Date,
            bookedEndDate: Date,
            status: Boolean
        }],
}, {
    collection: 'caravailability',
    versionKey: false,
});
exports.default = connections.db.model('Caravailability', CarAvailabilitySchema);
//# sourceMappingURL=model.js.map