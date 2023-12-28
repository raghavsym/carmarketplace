import { ICarModel, DateRange} from './model';
/**
 * @export
 * @interface ICarService
 */
export interface ICarService {

    /**
     * @returns {Promise<ICarModel[]>}
     * @memberof ICarService
     */
    findAll(userId: string): Promise<ICarModel[]>;

    /**
     * @returns {Promise<ICarModel[]>}
     * @memberof ICarService
     */
    findAllByFilter(body: any): Promise<ICarModel[]>;

     /**
     * @returns {Promise<ICarModel>}
     * @memberof ICarService
     */
    setCarAvailability(body: DateRange, id: string): Promise<ICarModel>;

    /**
     * @param {string} code
     * @returns {Promise<ICarModel>}
     * @memberof ICarService
     */
    findOne(code: string): Promise<ICarModel>;

    /**
     * @param {ICarModel} userModel
     * @returns {Promise<ICarModel>}
     * @memberof ICarService
     */
    insert(carModel: ICarModel): Promise<ICarModel>;

}
