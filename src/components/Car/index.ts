import { NextFunction, Request, Response } from 'express';
import CarService from './service';
import { HttpError } from '../../config/error';
import { ICarModel } from './model';
import { IUserModel } from '../User/model';
import UserService from '../User/service';


export interface RequestWithUser extends Request {
    user: object | string;
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const cars: ICarModel[] = await CarService.findAll(req.body.userId);

        res.status(200).json(cars);
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
 export async function findAllByFilter(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const cars: ICarModel[] = await CarService.findAllByFilter(req.body);

        res.status(200).json(cars);
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
 export async function setCarAvailability(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const cars: ICarModel = await CarService.setCarAvailability(req.body, req.params.id);

        res.status(200).json(cars);
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
export async function findOne(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {

        const car: ICarModel = await CarService.findOne(req.params.id);
        res.status(200).json(car);
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
export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise < void > {
    try {
        const user: any = req.user;
        req.body.userId = user.userId;

        const car: ICarModel = await CarService.insert(req.body);
        await UserService.findOne(user.userId)
        .then( (user: IUserModel) => {
            user.cars.push(car._id.toString());
            user.save();
        });

        res.status(201).json(car);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
