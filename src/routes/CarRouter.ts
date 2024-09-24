import { Router } from 'express';
import { CarComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/getCars', CarComponent.findAll);

router.post('/getCarsByFilter', CarComponent.findAllByFilter);

router.post('/addCar', CarComponent.add);

router.get('/:id', CarComponent.findOne);

router.post('/setCarAvailability', CarComponent.setCarAvailability);



/**
 * @export {express.Router}
 */
export default router;
