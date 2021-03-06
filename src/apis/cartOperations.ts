import { ProductInterface, ProductI } from '../models/products/productsInterface';
import { fileOperations } from './filesOperations';
import { productsOperations } from './productsOperations';
class CartOperations {
    async findOne(id: number) : Promise <any> {
        try {
            const readCart = await fileOperations.readFile('cartdb.json');
            //let productFound = readCart.find(aProduct => aProduct.id === id);
            /*if(productFound) {
                return productFound
            } else throw {
                status: 404,
                msg: 'El producto solicitado no existe en tu carrito'
            }*/
            return 'ok'
        } catch (error) {
            throw error;
        }
    }
    async getAll() {
        try {
            const cart = await fileOperations.readFile('cartdb.json');
            return cart;
        } catch (error) {
            throw error
        }
    }
    async addCart(product: ProductInterface){
        try {
            const addToCart = await fileOperations.addNewItem('cartdb.json', product);
            return addToCart;
        } catch (error) {
            throw error;
        }
    }
    async deleteCart(id: number) {
        try {
            let cart = await fileOperations.readFile('cartdb.json');
            //cart = cart.filter(aProduct => aProduct.id !== id);
            //await fileOperations.writeFile('cartdb.json', cart);

            if(cart.length != 0) return cart;
            else throw {
                status: 200,
                msg: 'Producto eliminado exitosamente, tu carrito ahora esta vacio!'
            }
        } catch (error) {
            throw error;
        }
    }
}

export const cartOperations = new CartOperations();
