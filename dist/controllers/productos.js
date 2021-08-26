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
exports.productsController = void 0;
const productsOperations_1 = require("../persistencia/productsOperations");
class Producto {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const product = yield productsOperations_1.productsOperations.findOne(Number(id));
                if (!product) {
                    return res.status(404).json({
                        error: "No se encontro el producto solicitado"
                    });
                }
                return res.status(200).json({
                    data: product
                });
            }
            const products = yield productsOperations_1.productsOperations.getAll();
            return res.status(200).json({ data: products });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, code, photo, price, stock } = req.body;
            if (!name || !price || !description || !code || !photo || !stock) {
                return res.status(400).json({ error: 'La informacion ingresada es incorrecta' });
            }
            const newProduct = yield productsOperations_1.productsOperations.add(req.body);
            return res.status(201).json({
                msg: "Producto creado con exito!",
                data: newProduct
            });
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const findProduct = yield productsOperations_1.productsOperations.findOne(id);
            if (findProduct == undefined) {
                return res.status(404).json({
                    error: "El producto que estas intentando actualizar no existe"
                });
            }
            const updateProduct = yield productsOperations_1.productsOperations.update(id, req.body, findProduct);
            res.status(201).json({
                msg: 'Producto actualizado con exito!',
                data: updateProduct
            });
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const findProduct = productsOperations_1.productsOperations.findOne(id);
            if (!findProduct) {
                return res.status(400).json({
                    error: "El producto que estas intentando eliminar no existe"
                });
            }
            const products = yield productsOperations_1.productsOperations.delete(id);
            return res.status(200).json({
                msg: 'El producto se elimino exitosamente',
                data: products
            });
        });
    }
}
exports.productsController = new Producto();
