"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Middleware = require("../middleware/middleware");
const Routes = require("../../routes");
/**
 * @constant {express.Application}
 */
const app = express();
/**
 * @constructs express.Application Middleware
 */
Middleware.configure(app);
/**
 * @constructs express.Application Routes
 */
Routes.init(app);
/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);
/**
 * sets port 3001 to default or unless otherwise specified in the environment
 */
app.set('port', 3001);
/**
 * sets secret to 'superSecret', otherwise specified in the environment
 */
app.set('secret', process.env.SECRET || 'superSecret');
/**
 * @exports {express.Application}
 */
exports.default = app;
//# sourceMappingURL=server.js.map