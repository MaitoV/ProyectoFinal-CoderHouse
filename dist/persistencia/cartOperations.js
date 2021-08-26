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
exports.cartOperations = void 0;
const filesOperations_1 = require("./filesOperations");
class CartOperations {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const readCart = yield filesOperations_1.fileOperations.readFile('cartdb.json');
            return readCart.find(aProduct => aProduct.id === id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield filesOperations_1.fileOperations.readFile('cartdb.json');
            return cart;
        });
    }
    addCart(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const addToCart = yield filesOperations_1.fileOperations.addNewItem('cartdb.json', product);
            return addToCart;
        });
    }
    deleteCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield filesOperations_1.fileOperations.readFile('cartdb.json');
            cart = cart.filter(aProduct => aProduct.id !== id);
            yield filesOperations_1.fileOperations.writeFile('cartdb.json', cart);
            return cart;
        });
    }
}
exports.cartOperations = new CartOperations();
