import knex from "knex";
import moment from "moment";
import { ProductInterface, ProductI, ProductQuery, ProductsClassDAOs } from "../productsInterface";

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
            if(productsList.length == 0) throw({
                status: 404,
                msg: 'Todavia no hay productos cargados en tu base de datos'
            })

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getById(productId: string): Promise<ProductInterface | undefined > {
        try {
            const id = Number(productId);
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
    
    async delete(productId:string) : Promise<void> {
        try {
            const id = Number(productId);
            await this.mysqlDB('products').where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

    async update(productId:string, newData:any): Promise<ProductInterface> {
        try {
            const id = Number(productId);
            const update = await this.mysqlDB('products').where({id: id}).update(newData);
            return update;
        } catch (error) {
            throw error;
        }
    }

    async query(queries: ProductQuery): Promise <ProductI | ProductI[]> {
        try {
            const findProduct = await this.mysqlDB.from('products').where(queries);
            if(findProduct.length == 0) throw({
                status: 404,
                msg: 'No se encontro ningun producto con los filtros seleccionados'
            })
            return findProduct;     
        } catch (error) {
            throw error;
        }
    }

}