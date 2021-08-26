import productInterface from './productInterface';
import { fileOperations } from './filesOperations';

let productos = [
    {id:1, name:"lapicera", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock:10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:2, name:"mochila", description:"Lapicera transparente de punta fina", code: "2032A24", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:200, stock:10, timestamps: "2021-08-25T17:31:54.070Z"},
    {id:3, name:"cuaderno", description:"Cuaderno de tapas duras", code: "2020A23", photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU", price:500, stock:4, timestamps: "2021-08-26T17:31:54.070Z"}
]

class ProductsOperations {
    async findOne(id: number) : Promise <productInterface | undefined > {
        const readDB = await fileOperations.readFile('productsdb.json');
        return readDB.find(aProduct => aProduct.id === id);
    }
    async getAll() : Promise < Array<productInterface> | null > {
        let productsList = await fileOperations.readFile('productsdb.json');
        return productsList;
    }
    async add(data: productInterface){
        const addToDB = await fileOperations.addNewItem('productsdb.json', data);
        return addToDB;
    }
    async delete(id:number){
        let dbProducts = await fileOperations.readFile('productsdb.json');
        dbProducts = dbProducts.filter(aProduct => aProduct.id !== id);
        await fileOperations.writeFile('productsdb.json', dbProducts);
        return dbProducts;
    }
    async update(
        id: number, 
        newData: productInterface, 
        oldData: productInterface) {
        let db = await fileOperations.readFile('productsdb.json');
        db = await this.delete(id);

        const updateProduct = {...oldData, ...newData};

        db.push(updateProduct);
        db.sort((productA: productInterface, productB: productInterface) => productA.id - productB.id); 

        await fileOperations.writeFile('productsdb.json', db);
        return updateProduct;
    }
}

export const productsOperations = new ProductsOperations();