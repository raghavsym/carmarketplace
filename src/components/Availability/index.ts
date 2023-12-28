import { NextFunction, Request, Response } from 'express';
import CarAvailabilityService from './service';
import { HttpError } from '../../config/error';
import { ICarAvailabilityModel } from './model';
import { IFilteredCar } from './interface';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function setCarAvailability(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const reservation: ICarAvailabilityModel = await CarAvailabilityService.setCarAvailability(req.body);

        res.status(200).json(reservation);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
 export async function getCarAvailability(req: Request, res: Response, next: NextFunction): Promise < any > {
    try {
        const reservation: any = await CarAvailabilityService.getCarAvailability(req.body);

        res.status(200).json(reservation);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


