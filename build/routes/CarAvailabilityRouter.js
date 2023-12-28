"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
/**
 * @constant {express.Router}
 */
const router = (0, express_1.Router)();
router.post('/setCarBooking', components_1.CarAvailabilityComponent.setCarAvailability);
router.post('/getCarAvailability', components_1.CarAvailabilityComponent.getCarAvailability);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=CarAvailabilityRouter.js.map