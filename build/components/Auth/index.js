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
exports.token = exports.login = exports.signup = void 0;
const OAuth2Server = require("oauth2-server");
const oauth_1 = require("../../config/oauth");
const service_1 = require("./service");
const error_1 = require("../../config/error");
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield service_1.default.createUser(req.body);
            res.json({
                status: 200,
                user: {
                    email: user.email,
                },
            });
        }
        catch (error) {
            if (error.code === 500) {
                return next(new error_1.default(error.message.status, error.message));
            }
            res.json({
                status: 400,
                message: error.message,
            });
        }
    });
}
exports.signup = signup;
/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqOAuth = new OAuth2Server.Request(req);
        const resOAuth = new OAuth2Server.Response(res);
        const options = {
            authenticateHandler: {
                handle: (request) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = yield service_1.default.getUser(request.body);
                        return user;
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                }),
            },
        };
        try {
            const code = yield oauth_1.default.authorize(reqOAuth, resOAuth, options);
            // res.json({url: `${code.redirectUri}?code=${code.authorizationCode}&state=${req.body.state}`})
            res.redirect(`${code.redirectUri}?code=${code.authorizationCode}&state=${req.query.state}`);
        }
        catch (e) {
            res.json({ error: e });
        }
    });
}
exports.login = login;
/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
function token(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reqOAuth = new OAuth2Server.Request(req);
            const resOAuth = new OAuth2Server.Response(res);
            const oAuthToken = yield oauth_1.default.token(reqOAuth, resOAuth);
            res.json({
                accessToken: oAuthToken.accessToken,
                refreshToken: oAuthToken.refreshToken,
            });
        }
        catch (error) {
            return next(new error_1.default(error.status, error.message));
        }
    });
}
exports.token = token;
//# sourceMappingURL=index.js.map