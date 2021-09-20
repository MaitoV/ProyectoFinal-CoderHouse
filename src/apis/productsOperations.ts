import { ProductInterface } from '../models/products/productsInterface';
import { tipoDePersistencia } from '../models/products/productsFactory';
import { productsFactory } from '../models/products/productsFactory';

const persistencia = tipoDePersistencia.Memory;

class ProductsOperations {
    private persistenceInstance;
    constructor() {
        this.persistenceInstance = productsFactory.get(persistencia);
    }


    async findOne(id: number) : Promise <ProductInterface | undefined > {
        return await this.persistenceInstance.getById(id)
        //TODO: Trabajar que pasa si vuelve undefined
        /*try {
            const readDB = await fileOperations.readFile('productsdb.json');
            const product = readDB.find(aProduct => aProduct.id === id);
            if(product){
                return product
            } else throw {
                status: 404,
                msg: 'No se encontro el producto solicitado'
            }
        } catch (error) {
            throw error;
        }*/
    }

    async getAll(): Promise<ProductInterface[]> {
        return await this.persistenceInstance.get();
    }

    async add(data: ProductInterface){
        return this.persistenceInstance.add(data);
    }

    async delete(id:number){
        return this.persistenceInstance.delete(id);
    }

    async update(
        id: number, 
        newData: ProductInterface) {
            return await this.persistenceInstance.update(id, newData);
    }
}

export const productsOperations = new ProductsOperations();