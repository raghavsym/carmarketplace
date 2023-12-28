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
const bcrypt = require("bcrypt");
const mongoose_1 = require("mongoose");
const connections = require("../../config/connection/connection");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array,
    name: String,
    gender: String,
    location: String,
    picture: String,
    cars: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Car'
        }]
}, {
    collection: 'users',
    versionKey: false,
}).pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // tslint:disable-line
        if (!user.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt.genSalt(10);
            const hash = yield bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt.compare(candidatePassword, this.password);
            return match;
        }
        catch (error) {
            return error;
        }
    });
};
exports.default = connections.db.model('Users', UserSchema);
//# sourceMappingURL=model.js.map