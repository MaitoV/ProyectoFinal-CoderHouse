import {Router} from 'express';
import { productsController } from '../controllers/productos';
import {checkAdmin} from '../middlewares/Admin';

const router = Router();

router.get('/listar', productsController.getProducts);
router.get('/listar/:id', productsController.getProducts);
router.post('/agregar', checkAdmin, productsController.addProduct)
router.put('/actualizar/:id', checkAdmin, productsController.updateProduct);
router.delete('/borrar/:id', checkAdmin, productsController.deleteProduct);

export default router;