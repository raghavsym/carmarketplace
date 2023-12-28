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
const OAuth2Server = require("oauth2-server");
const error_1 = require("../error");
const oauth_1 = require("../oauth");
/**
 *
 * @param {Opt} opt
 * @returns {Promise < void >}
 */
function default_1(opt = {}) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqOAuth = new OAuth2Server.Request({
                headers: {
                    authorization: req.headers.authorization,
                },
                method: req.method,
                query: req.query,
                body: req.body,
            });
            const resOAuth = new OAuth2Server.Response(res);
            try {
                const userInfo = yield oauth_1.default.authenticate(reqOAuth, resOAuth, opt);
                if (userInfo) {
                    req.body["userId"] = userInfo.user;
                }
                return next();
            }
            catch (error) {
                return next(new error_1.default(error.status, error.message));
            }
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=oAuth.js.map