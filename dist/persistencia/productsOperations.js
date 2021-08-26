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
exports.productsOperations = void 0;
const filesOperations_1 = require("./filesOperations");
class ProductsOperations {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const readDB = yield filesOperations_1.fileOperations.readFile('productsdb.json');
            return readDB.find(aProduct => aProduct.id === id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let productsList = yield filesOperations_1.fileOperations.readFile('productsdb.json');
            return productsList;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const addToDB = yield filesOperations_1.fileOperations.addNewItem('productsdb.json', data);
            return addToDB;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbProducts = yield filesOperations_1.fileOperations.readFile('productsdb.json');
            dbProducts = dbProducts.filter(aProduct => aProduct.id !== id);
            yield filesOperations_1.fileOperations.writeFile('productsdb.json', dbProducts);
            return dbProducts;
        });
    }
    update(id, newData, oldData) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = yield filesOperations_1.fileOperations.readFile('productsdb.json');
            db = yield this.delete(id);
            const updateProduct = Object.assign(Object.assign({}, oldData), newData);
            db.push(updateProduct);
            db.sort((productA, productB) => productA.id - productB.id);
            yield filesOperations_1.fileOperations.writeFile('productsdb.json', db);
            return updateProduct;
        });
    }
}
exports.productsOperations = new ProductsOperations();
