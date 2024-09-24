import { NextFunction, Request, Response } from 'express';
import ReservationService from './service';
import { HttpError } from '../../config/error';
import { IReservationModel } from './model';

export interface RequestWithUser extends Request {
    user: {
        userId: string
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function carReservation(req: RequestWithUser, res: Response, next: NextFunction): Promise < void > {
    try {
        const reservation: IReservationModel = await ReservationService.reservation(req);

        res.status(200).json(reservation);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

export async function myBookings(req: RequestWithUser, res: Response, next: NextFunction): Promise < void > {
    try{
        const myBookings: IReservationModel[] = await ReservationService.myBookings(req.user.userId);

        res.status(200).json(myBookings);
    }catch(error){
        next(new HttpError(error.message.status, error.message));
    }
}


