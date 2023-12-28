import { Router } from 'express';
import { CarAvailabilityComponent } from '../components';
/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/setCarBooking', CarAvailabilityComponent.setCarAvailability);
router.post('/getCarAvailability', CarAvailabilityComponent.getCarAvailability);

/**
 * @export {express.Router}
 */
export default router;
