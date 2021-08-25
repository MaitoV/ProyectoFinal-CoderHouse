let productos = [
    {id:1, name:"lapicera", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock: 10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:2, name:"mochila", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock: 10, timestamps: "2021-08-25T17:31:54.070Z"},
]

interface Product {
    id: number,
    name: string,
    description: string,
    code: string,
    photo: string,
    price: number,
    stock: number,
    timestamps: string,
}
class ProductsOperations {
    findOne(id: number) : Product | undefined{
        return productos.find(aProduct => aProduct.id === id);
    }
    getAll() {
            return productos;
    }
    add(data: Product){
        const newProduct = {
            id: productos.length + 1,
            name: data.name,
            description: data.description,
            code: data.code,
            photo: data.photo,
            price: data.price,
            stock: data.stock,
            timestamps: `${new Date()}`
        }
        productos.push(newProduct);

        return newProduct;
    }
    update(id: number, data: Product){

    }
    delete(id:number){
        return productos.filter(aProduct => aProduct.id !== id)
    }
}

export const productsOperations = new ProductsOperations();