import * as Joi from "joi";
import { Types } from "mongoose";
import CarModel, { ICarModel, DateRange } from "./model";
import CarValidation from "./validation";
import { ICarService } from "./interface";

/**
 * @export
 * @implements {ICarModelService}
 */
const CarService: ICarService = {
  /**
   * @returns {Promise < ICarModel[] >}
   * @memberof CarService
   */
  async findAll(userId): Promise<ICarModel[]> {
    try {
      return await CarModel.find({ userId: { $ne: userId } }).select([
        "carModel",
        "carPrice",
        "carPicture",
      ]);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @returns {Promise < ICarModel[] >}
   * @memberof CarService
   */
  async findAllByFilter(body: any): Promise<ICarModel[]> {
    try {
      const subQuery: any = [
        {
          $match: {
            $and: [{ userId: { $ne: body.userId } }],
          },
        },
      ];
      if (body && body.carModel) {
        subQuery[0]["$match"]["$and"].push({ carModel: body.carModel });
      }
      if (body && body.price) {
        subQuery[0]["$match"]["$and"].push({
          carPrice: { $lte: body.price.end, $gte: body.price.start },
        });
      }
      return await CarModel.aggregate(subQuery);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < ICarModel >}
   * @memberof CarService
   */
  async findOne(id: string): Promise<ICarModel> {
    try {
      const validate: Joi.ValidationResult = CarValidation.getCar({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await CarModel.findOne({
        _id: new Types.ObjectId(id),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {ICArModel} car
   * @returns {Promise < ICarModel >}
   * @memberof CarService
   */
  async insert(body: ICarModel): Promise<ICarModel> {
    try {
      // body["availableDateRange"] = [];
      const validate: Joi.ValidationResult = CarValidation.createCar(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const car: ICarModel = await CarModel.create(body);

      return car;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} id
   * @returns {Promise < ICarModel >}
   * @memberof CarService
   */
  async setCarAvailability(body: DateRange, carId: string): Promise<ICarModel> {
    try {
      const dateRange: DateRange = {
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      };
      const validate: Joi.ValidationResult = CarValidation.dateRange(dateRange);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const car: ICarModel = await CarService.findOne(carId).then(
        (car: ICarModel) => {
          car.availableDateRange.push(dateRange);
          car.save();
          return car;
        }
      );
      return car;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default CarService;
