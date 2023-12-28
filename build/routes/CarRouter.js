"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
/**
 * @constant {express.Router}
 */
const router = (0, express_1.Router)();
router.get('/getCars', components_1.CarComponent.findAll);
router.post('/getCarsByFilter', components_1.CarComponent.findAllByFilter);
router.post('/createCar', components_1.CarComponent.create);
router.get('/:id', components_1.CarComponent.findOne);
router.post('/setCarAvailability/:id', components_1.CarComponent.setCarAvailability);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=CarRouter.js.map