"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express = require("express");
const http = require("http");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const AuthRouter_1 = require("./AuthRouter");
const UserRouter_1 = require("./UserRouter");
const CarRouter_1 = require("./CarRouter");
const CarAvailabilityRouter_1 = require("./CarAvailabilityRouter");
const ReservationRouter_1 = require("./ReservationRouter");
const oAuth_1 = require("../config/middleware/oAuth");
const RedisClient_1 = require("../services/RedisClient");
const swaggerDef = require('../../swaggerDef');
/**
 * @export
 * @param {express.Application} app
 */
function init(app) {
    const router = express.Router();
    app.use('/v1/users', (0, oAuth_1.default)(), UserRouter_1.default);
    app.use('/v1/cars', (0, oAuth_1.default)(), CarRouter_1.default);
    app.use('/v1/reservation', (0, oAuth_1.default)(), ReservationRouter_1.default);
    app.use('/v1/availability', (0, oAuth_1.default)(), (0, RedisClient_1.default)(), CarAvailabilityRouter_1.default);
    app.use('/auth', AuthRouter_1.default);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, '../../src/**/**/*.ts')],
    })));
    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });
    app.use('/', (req, res) => {
        res.send("Car market health is great!");
    });
    /**
     * @constructs all routes
     */
    app.use(router);
}
exports.init = init;
//# sourceMappingURL=index.js.map