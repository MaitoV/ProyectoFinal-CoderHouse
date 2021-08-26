import moment from 'moment';

let productos = [
    {id:1, name:"lapicera", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock:10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:2, name:"mochila", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock:10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:3, name:"cuaderno", description:"Cuaderno de tapas duras", code: "2020A23", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:500, stock:4, timestamps: "2021-08-26T17:31:54.070Z"}
]

interface Product {
    id: number,
    name: string,
    description: string,
    code: string,
    photo: string,
    price: number,
    stock: number,
    timestamps: string
}
class ProductsOperations {
    findOne(id: number) : Product | undefined {
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
            timestamps: `${moment().format('DD MM YY h:mm')}`
        }
        productos.push(newProduct);

        return newProduct;
    }
    delete(id:number){
        console.log('eliminado con exito!');
        return productos = productos.filter(aProduct => aProduct.id !== id);
    }
    update(id: number, newData: Product, oldData: Product){
        const updateProduct = {...oldData, ...newData};
        this.delete(id);
        productos.push(updateProduct);
        productos = productos.sort((productA: Product, productB: Product) => productA.id - productB.id); 
        console.log(productos);
        return updateProduct;
    }
}

export const productsOperations = new ProductsOperations();