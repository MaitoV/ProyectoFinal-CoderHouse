import productInterface from './productInterface'; 

let cart = [
    {id:3, name:"cuaderno", description:"Cuaderno de tapas duras", code: "2020A23", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:500, stock:4, timestamps: "2021-08-26T17:31:54.070Z"}
]

class CartOperations {
    findOne(id: number) {
        return cart.find(aProduct => aProduct.id === id);
    }
    getAll() {
        return cart;
    }
    addCart(product: productInterface){
        cart.push(product);
        return cart;
    }
    deleteCart(id: number) {
        return cart = cart.filter(aProduct => aProduct.id !== id);
    }
}

export const cartOperations = new CartOperations();