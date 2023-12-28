import { NextFunction, Request, Response } from 'express';
import ReservationService from './service';
import { HttpError } from '../../config/error';
import { IReservationModel } from './model';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function carReservation(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const reservation: IReservationModel = await ReservationService.reservation(req.body, req.params.id);

        res.status(200).json(reservation);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


