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
const authCodeModel_1 = require("./authCodeModel");
const clientModel_1 = require("./clientModel");
const tokenModel_1 = require("./tokenModel");
// YOU CAN DELETE THIS BLOCK AFTER CLIENT CREATED
const redirectUris = 'http://localhost:3001/oauthExample/callback'.split(',').map((item) => {
    return item.trim();
});
const defaultClient = new clientModel_1.default({
    id: '6d052460baecf69ec3a76c82b1f69a4c36131d86',
    secret: 'd71f2f060b1420cb503d6104ec5a582f231f7832',
    type: 'confidential',
    redirectUris,
    grants: ['authorization_code', 'refresh_token']
});
defaultClient.save((err) => {
    if (err) {
        console.log('error during creating defaultClient');
        console.log(err);
    }
    else {
        console.log('created defaultClient');
    }
});
const OAuth2ServerModel = {
    /**
     * @param {string} clientId
     * @param {clientSecret} clientSecret
     * @returns {Promise<OAuth2Server.Client | OAuth2Server.Falsey>}
     */
    getClient: (clientId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield clientModel_1.default.findOne({
                id: clientId,
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    /**
     * @param {OAuth2Server.Token} token
     * @param {OAuth2Server.Client} client
     * @param {OAuth2Server.User} user
     * @returns {Promise<OAuth2Server.Token | OAuth2Server.Falsey>}
     */
    saveToken: (token, client, user) => __awaiter(void 0, void 0, void 0, function* () {
        const oAuthtoken = {
            user,
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            scope: token.scope,
            client: {
                id: client.id,
                grants: client.grants,
            },
        };
        return tokenModel_1.default.create(oAuthtoken);
    }),
    /**
     * @param {string} accessToken
     * @returns {Promise<OAuth2Server.Token | OAuth2Server.Falsey>}
     */
    getAccessToken: (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield tokenModel_1.default.findOne({
                accessToken,
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    /**
     * @param {OAuth2Server.Token} token
     * @param {sring | string[]} scope
     * @returns {Promise<boolean>}
     */
    verifyScope: (token, scope) => __awaiter(void 0, void 0, void 0, function* () {
        return token.scope === scope;
    }),
    /**
     * @param {string} authorizationCode
     * @returns {Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey>}
     */
    getAuthorizationCode: (authorizationCode) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authCode = yield authCodeModel_1.default.findOne({
                authorizationCode,
            });
            const code = {
                authorizationCode: authCode.authorizationCode,
                expiresAt: authCode.expiresAt,
                redirectUri: authCode.redirectUri,
                scope: authCode.scope,
                client: {
                    id: authCode.client.id,
                    grants: authCode.client.grants,
                },
                user: authCode.user,
            };
            return code;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    /**
     * @param {Auth2Server.AuthorizationCode} code
     * @param {Auth2Server.Client} client
     * @param {Auth2Server.User} user
     * @returns {Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey>}
     */
    saveAuthorizationCode: (code, client, user) => __awaiter(void 0, void 0, void 0, function* () {
        const authorizationCode = {
            client: {
                id: client.id,
                grants: client.grants,
            },
            user: user.id,
            scope: code.scope,
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            redirectUri: code.redirectUri,
        };
        return authCodeModel_1.default.create(authorizationCode);
    }),
    /**
     * @param {OAuth2Server.AuthorizationCode} authorizationCode
     * @returns {Promise<boolean>}
     */
    revokeAuthorizationCode: (authorizationCode) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield authCodeModel_1.default.deleteOne({
                authorizationCode: authorizationCode.authorizationCode,
            });
            return result.deletedCount > 0;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    /**
     * @param {string} refreshToken
     * @returns {Promise<OAuth2Server.RefreshToken | OAuth2Server.Falsey>}
     */
    getRefreshToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield tokenModel_1.default.findOne({
                refreshToken,
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    /**
     * @param {OAuth2Server.RefreshToken} token
     * @returns {Promise<boolean>}
     */
    revokeToken: (token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield tokenModel_1.default.deleteOne({
                refreshToken: token.refreshToken,
            });
            return result.deletedCount > 0;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};
/**
 * @exports
 */
exports.default = new OAuth2Server({
    accessTokenLifetime: 12 * 60 * 60,
    allowBearerTokensInQueryString: true,
    model: OAuth2ServerModel,
});
//# sourceMappingURL=index.js.map