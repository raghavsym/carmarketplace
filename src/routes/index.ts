import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import CarRouter from './CarRouter';
import CarAvailability from './CarAvailabilityRouter';
import ReservationRouter from './ReservationRouter';
import * as jwtConfig from '../config/middleware/jwtAuth';

import  getCache   from '../services/RedisClient'


// const swaggerDef = require('../../swaggerDef');

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
    const router: express.Router = express.Router();
    
    app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);
    app.use('/v1/cars', jwtConfig.isAuthenticated, CarRouter);
    app.use('/v1/reservation', jwtConfig.isAuthenticated, ReservationRouter);
    app.use('/v1/availability', jwtConfig.isAuthenticated, getCache(), CarAvailability);
    app.use('/auth', AuthRouter);

    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({
    //     swaggerDefinition: swaggerDef,
    //     apis: [path.join(__dirname, '../../src/**/**/*.ts')],
    // })));

    /**
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    app.use('/', (req, res)=>{
        res.send("Car market health is great!")
    })

    /**
     * @constructs all routes
     */
    app.use(router);
}
