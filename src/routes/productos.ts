import {Router} from 'express';
import { productsController } from '../controllers/productos';
const router = Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProducts);
router.post('/', productsController.addProduct)
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;