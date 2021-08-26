import {Router} from 'express';
import { cartController } from '../controllers/cart';
const router = Router();

router.get('/listar', cartController.getCart);
router.get('/listar/:id', cartController.getCart);
router.post('/agregar/:id', cartController.addCartProduct)
router.delete('/borrar/:id', cartController.deleteCartProduct);

export default router;