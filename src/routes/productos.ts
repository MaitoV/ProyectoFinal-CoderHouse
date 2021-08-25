import {Router} from 'express';
import { productsController } from '../controllers/productos';
const router = Router();

router.get('/listar', productsController.getProducts);
router.get('/listar/:id', productsController.getProducts);
router.post('/agregar', productsController.addProduct)
router.put('/actualizar/:id', productsController.updateProduct);
router.delete('/borrar/:id', productsController.deleteProduct);

export default router;