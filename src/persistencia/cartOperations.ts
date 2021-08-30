import productInterface from './productInterface'; 
import { fileOperations } from './filesOperations';
class CartOperations {
    async findOne(id: number) : Promise <productInterface | undefined > {
        
        const readCart = await fileOperations.readFile('cartdb.json');
        return readCart.find(aProduct => aProduct.id === id);
    }
    async getAll() {
        const cart = await fileOperations.readFile('cartdb.json');
        return cart;
    }
    async addCart(product: productInterface){
        const addToCart = await fileOperations.addNewItem('cartdb.json', product);
        return addToCart;
    }
    async deleteCart(id: number) {
        let cart = await fileOperations.readFile('cartdb.json');
        cart = cart.filter(aProduct => aProduct.id !== id);
        await fileOperations.writeFile('cartdb.json', cart);
        return cart;
    }
}

export const cartOperations = new CartOperations();