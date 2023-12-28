import { Router } from 'express';
import { ReservationComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/:id', ReservationComponent.carReservation);

/**
 * @export {express.Router}
 */
export default router;
