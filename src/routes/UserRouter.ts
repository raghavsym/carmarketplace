import { Router } from 'express';
import { UserComponent } from '../components';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/', UserComponent.findAll);

// router.post('/', UserComponent.create);

/**
 * @export {express.Router}
 */
export default router;
