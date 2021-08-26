import productInterface from './productInterface';
import { fileOperations } from './filesOperations';
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