//Ruter principal que importara todas las demas rutas
import {Router} from 'express';
import productsRouter from './products';
import cartRouter from './cart';
const router = Router();

//Todo lo que venga con el prefijo /products se lo delego al router de productos
router.use('/products', productsRouter);

router.use('/cart', cartRouter);

export default router;