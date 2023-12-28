"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
/**
 * @constant {express.Router}
 */
const router = (0, express_1.Router)();
router.post('/:id', components_1.ReservationComponent.carReservation);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=ReservationRouter.js.map