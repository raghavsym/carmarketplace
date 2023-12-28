import { ICarAvailabilityModel, IBookedSlot } from './model';

/**
 * @export
 * @interface ICarAvailabilityModel
 */
export interface ICarAvailabilityService {

    /**
     * @param {ICarAvailabilityModel} ICarAvailability
     * @returns {Promise<ICarAvailabilityModel>}
     * @memberof ICarAvailabilityService
     */
     setCarAvailability(availabilty: ICarAvailability): Promise<ICarAvailabilityModel>;

     /**
     * @param {ICarAvailabilityModel} ICarAvailability
     * @returns {Promise<ICarAvailabilityModel>}
     * @memberof ICarAvailabilityService
     */
     getCarAvailability(dateRange: IDateRange): Promise<any>;
    
}

/**
 * @export
 * @interface ICarAvailability
 */
 export interface ICarAvailability {
    carId: string;
    userId: string;
    bookedSlot: IBookedSlot[]
}

/**
 * @export
 * @interface IDateRange
 */
 export interface IDateRange {
    startDate: string;
    endDate: string;
    userId: string
}

/**
 * @export
 * @interface I
 */
 export interface IFilteredCar {
    carId: string
    renterId: string
    startDate: string;
    endDate: string;
}