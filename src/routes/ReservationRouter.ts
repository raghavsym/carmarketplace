import { Router } from 'express';
import { ReservationComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.post('/', ReservationComponent.carReservation);

router.get('/myBookings', ReservationComponent.myBookings);

/**
 * @export {express.Router}
 */
export default router;
