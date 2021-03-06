import {Router} from 'express';
import { productsController } from '../controllers/productos';
import {checkAdmin} from '../middlewares/Admin';
import { checkProductExists } from '../middlewares/checkProductsExists';

const router = Router();

router.get('/listar', productsController.getProducts);
router.get('/listar/:id', productsController.getProducts);
router.post('/agregar', checkAdmin, productsController.addProduct)
router.put('/actualizar/:id', checkAdmin, checkProductExists, productsController.updateProduct);
router.delete('/borrar/:id', checkAdmin, checkProductExists, productsController.deleteProduct);

export default router;