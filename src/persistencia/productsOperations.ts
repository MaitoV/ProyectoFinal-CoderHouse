import productInterface from './productInterface';
import { fileOperations } from './filesOperations';
class ProductsOperations {
    async findOne(id: number) : Promise <productInterface | undefined > {
        try {
            const readDB = await fileOperations.readFile('productsdb.json');
            const product = readDB.find(aProduct => aProduct.id === id);
            if(product){
                return product
            } else throw {
                status: 200,
                msg: 'No se encontro el producto solicitado'
            }
        } catch (error) {
            throw {
                status: error.status,
                msg: error.msg
            }
        }
    }

    async getAll() : Promise < Array<productInterface> | null > {
        try {
            let productsList = await fileOperations.readFile('productsdb.json');
            if(productsList.length == 0) {
                throw {
                    status: 200,
                    msg: 'Tu lista esta vacia! no hay productos guardados'
                }
            }
            return productsList;
        } catch (error) {
            throw {
                status: error.status,
                msg: error.msg
            }
        }  
    }

    async add(data: productInterface){
            const addToDB = await fileOperations.addNewItem('productsdb.json', data);
            return addToDB;
    }

    async delete(id:number){
        try {
            let dbProducts = await fileOperations.readFile('productsdb.json');
            dbProducts = dbProducts.filter(aProduct => aProduct.id !== id);
            await fileOperations.writeFile('productsdb.json', dbProducts);
            return dbProducts;
        } catch (e) {
            throw {
                status: 502,
                msg: 'Se produjo un error al eliminar el producto solicitado'
            }
        }
        
    }

    async update(
        id: number, 
        newData: productInterface, 
        oldData: productInterface) {
            try { 
                let db = await fileOperations.readFile('productsdb.json');
                db = await this.delete(id);

                const updateProduct = {...oldData, ...newData};

                db.push(updateProduct);
                db.sort((productA: productInterface, productB: productInterface) => productA.id - productB.id); 

                await fileOperations.writeFile('productsdb.json', db);
                return updateProduct;
            } catch (e) {
                throw {
                    status: 502,
                    msg: 'Se produjo un error al intentar actualizar el producto'
                }
            }  
    }
}

export const productsOperations = new ProductsOperations();