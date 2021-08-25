import {Router} from 'express';
const router = Router();


router.get('/listar', (req, res) => {
    res.json('GET ELEMENTOS DEL CARRITO!');
})
router.get('/listar/:id', (req, res) => {
    res.json('GET ELEMENTOS DEL CARRITO!');
})
router.post('/agregar/:id', (req, res) => {
    res.json('POST A CART!');
})
router.delete('/borrar/:id', (req, res) => {
    res.json('DELETE A CART!');
})

export default router;