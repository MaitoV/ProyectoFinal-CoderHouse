import knex from "knex";
import moment from "moment";
import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface, ProductI } from "../productsInterface";

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
            if(getProduct.length == 0) return undefined;
            return getProduct;
        } catch (error) {
            throw error;
        }
    }

    async add(data: ProductInterface): Promise<ProductInterface> {
        try {
            const newProduct: ProductI = {
                id: this.mysqlDB.default,
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment().format('DD MM YYYY hh:mm')}`
            }
            const addNewProduct = await this.mysqlDB.from('products').insert(newProduct);
            return newProduct;
        } catch (error) {
            throw error
        }
    }
    
    async delete(id:number) : Promise<void> {
        try {
            await this.mysqlDB('products').where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

    async update(id:number, newData:any): Promise<ProductInterface> {
        try {
            const update = await this.mysqlDB('products').where({id: id}).update(newData);
            return update;
        } catch (error) {
            throw error;
        }
    }

}