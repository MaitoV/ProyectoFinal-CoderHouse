import knex from "knex";
import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface } from "../productsInterface";

export class productsMySQL implements ProductsClassDAOs{
    private mysqlDB: any;
    constructor(){
        this.mysqlDB = knex({
            client: 'mysql',
            connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'Mr*y2Fl17',
            database: 'ecommerceCH' }
        })
    }

    async get(): Promise<ProductInterface[]> {
        try {
            const productsList = await this.mysqlDB.from('products').select();
            if(productsList.length == 0) throw('No hay productos cargados.')

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getById(id: number): Promise<ProductInterface | undefined > {
        try {
            const getProduct = await this.mysqlDB.from('products').where({id: id});

            if(getProduct.length == 0) throw('El producto solicitado no existe');

            return getProduct;
        } catch (error) {
            throw error;
        }
    }

    async add(data: ProductInterface): Promise<ProductInterface> {
        try {
            const addNewProduct = await this.mysqlDB.from('products').insert({
                name: data.name,
                price: data.price,
                photo: data.photo
            });
            return addNewProduct;
        } catch (error) {
            throw error
        }
    }
    
    async delete(id:number) : Promise<void> {
        try {
            const findProduct = await this.getById(id);

            await this.mysqlDB('products').where({id: id}).del();

        } catch (error) {
            throw error;
        }
    }

    async update(id:number, newData:any): Promise<ProductInterface> {
        try {
            const update = await this.mysqlDB('products').where({id: id}).update(newData);
            if(!update) throw('El producto que estas intentando editar no existe ')
            return update;
        } catch (error) {
            throw error;
        }
    }

}