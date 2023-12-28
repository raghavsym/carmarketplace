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
exports.clearCache = exports.setCache = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({ legacyMode: true, url: "redis://127.0.0.1:6379" });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
    }
    catch (err) {
        console.error(err);
    }
}))();
const expirationTime = 3000;
const userKeyFormat = 'user.id=';
function setCache(userId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var key = userKeyFormat + userId;
            return yield set(key, data);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.setCache = setCache;
function set(key, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.set(key, JSON.stringify(data));
            yield client.expire(key, 86400);
        }
        catch (e) {
            console.log("Set cache error: ", e);
        }
    });
}
function default_1(opt = {}) {
    return function getCache(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            let key = userKeyFormat + userId;
            try {
                let data = yield get(key);
                if (data) {
                    return JSON.parse(data);
                }
                else {
                    return next();
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    };
}
exports.default = default_1;
function get(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield client.get(key);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function clearCache(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const key = userKeyFormat + userId;
            return yield clear(key);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.clearCache = clearCache;
function clear(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield client.del(key);
        }
        catch (e) {
            console.log(e);
        }
    });
}
//# sourceMappingURL=RedisClient.js.map