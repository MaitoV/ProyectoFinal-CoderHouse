import moment from 'moment';
import productInterface from './productInterface';

let productos = [
    {id:1, name:"lapicera", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock:10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:2, name:"mochila", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock:10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:3, name:"cuaderno", description:"Cuaderno de tapas duras", code: "2020A23", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:500, stock:4, timestamps: "2021-08-26T17:31:54.070Z"}
]
class ProductsOperations {
    findOne(id: number) : productInterface | undefined {
        return productos.find(aProduct => aProduct.id === id);
    }
    getAll() {
            return productos;
    }
    add(data: productInterface){
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
    update(
        id: number, 
        newData: productInterface, 
        oldData: productInterface) {
        const updateProduct = {...oldData, ...newData};
        this.delete(id);
        productos.push(updateProduct);
        productos = productos.sort((productA: productInterface, productB: productInterface) => productA.id - productB.id); 
        console.log(productos);
        return updateProduct;
    }
}

export const productsOperations = new ProductsOperations();