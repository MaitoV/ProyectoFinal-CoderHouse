import {Router} from 'express';
const router = Router();


router.get('/', (req, res) => {
    res.json('GET ELEMENTOS DEL CARRITO!');
})
router.post('/', (req, res) => {
    res.json('POST A CART!');
})
router.put('/', (req, res) => {
    res.json('PUT A CART!');
})
router.delete('/', (req, res) => {
    res.json('DELETE A CART!');
})

export default router;