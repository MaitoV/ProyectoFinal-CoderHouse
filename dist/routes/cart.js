"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../controllers/cart");
const router = express_1.Router();
router.get('/listar', cart_1.cartController.getCart);
router.get('/listar/:id', cart_1.cartController.getCart);
router.post('/agregar/:id', cart_1.cartController.addCartProduct);
router.delete('/borrar/:id', cart_1.cartController.deleteCartProduct);
exports.default = router;
