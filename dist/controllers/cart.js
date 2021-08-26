"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cartOperations_1 = require("../persistencia/cartOperations");
const productsOperations_1 = require("../persistencia/productsOperations");
class Cart {
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                const findProduct = yield cartOperations_1.cartOperations.findOne(Number(req.params.id));
                if (!findProduct) {
                    return res.status(404).json({
                        error: 'El producto solicitado no existe en tu carrito'
                    });
                }
                return res.status(200).json({
                    data: findProduct
                });
            }
            const getCart = yield cartOperations_1.cartOperations.getAll();
            return res.status(200).json({
                data: getCart
            });
        });
    }
    addCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const findProduct = yield productsOperations_1.productsOperations.findOne(id);
            if (!findProduct) {
                return res.status(400).json({
                    error: 'El producto que estas intentando agregar al carrito no existe'
                });
            }
            const addToCart = yield cartOperations_1.cartOperations.addCart(findProduct);
            return res.status(201).json({
                msg: 'Producto añadido exitosamente',
                data: addToCart
            });
        });
    }
    deleteCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const findProduct = yield cartOperations_1.cartOperations.findOne(id);
            if (!findProduct) {
                return res.status(400).json({
                    error: 'El producto que estas intentando eliminar no existe en tu carrito'
                });
            }
            const deleteProduct = yield cartOperations_1.cartOperations.deleteCart(id);
            if (deleteProduct.length == 0) {
                return res.json({
                    msg: 'Producto eliminado exitosamente, tu carrito ahora esta vacio!'
                });
            }
            return res.json({
                msg: 'Producto eliminado exitosamente',
                data: deleteProduct
            });
        });
    }
}
exports.cartController = new Cart();
