"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
/**
 * @constant {express.Router}
 */
const router = (0, express_1.Router)();
router.get('/', components_1.UserComponent.findAll);
// router.post('/', UserComponent.create);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=UserRouter.js.map