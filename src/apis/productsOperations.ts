import { ProductInterface, ProductQuery } from '../models/products/productsInterface';
import { tipoDePersistencia } from '../models/products/productsFactory';
import { productsFactory } from '../models/products/productsFactory';

const persistencia = tipoDePersistencia.Memory;

class ProductsOperations {
    private persistenceInstance;
    constructor() {
        this.persistenceInstance = productsFactory.get(persistencia);
    }


    async findOne(id: string) : Promise <ProductInterface | undefined > {
        return await this.persistenceInstance.getById(id)
    }

    async getAll(): Promise<ProductInterface[]> {
        return await this.persistenceInstance.get();
    }

    async add(data: ProductInterface){
        return this.persistenceInstance.add(data);
    }

    async delete(id:string){
        return this.persistenceInstance.delete(id);
    }

    async update(
        id: string, 
        newData: ProductInterface) {
            return await this.persistenceInstance.update(id, newData);
    }

    async findQuery(queries: ProductQuery){
        return await this.persistenceInstance.query(queries);
    }
}

export const productsOperations = new ProductsOperations();