import knex from "knex";
import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface } from "../productsInterface";
import moment from "moment";
import { sqliteSeeds } from "../../../db/seeds/sqlite-seeds";

export class productsSQLite3 implements ProductsClassDAOs {
    private sqliteDB: any;
    constructor() {
        this.sqliteDB = knex({
            client: 'sqlite3',
            connection: {filename: './src/db/db.sqlite'}
        })
    }
    async initDB() {
        const tableProducts = await this.sqliteDB.schema.hasTable('products')
        if(!tableProducts) {
        await this.sqliteDB.schema.createTable('products', (productsTable: any) => {
            productsTable.increments();
            productsTable.string('name').notNullable();
            productsTable.integer('price').notNullable();
            productsTable.integer('stock').notNullable();
            productsTable.string('photo').notNullable();
            productsTable.string('code').notNullable();
            productsTable.string('description').notNullable();
            productsTable.string('timestamps').notNullable();
        })
        await this.sqliteDB.from('products').insert(sqliteSeeds);
        }
    }

    async get(): Promise<ProductInterface[]> {
        try {
            const productsList = await this.sqliteDB.from('products').select();
            if(productsList.length == 0) throw('No hay productos cargados.')

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getById(id: number): Promise<ProductInterface | undefined > {
        try {
            const getProduct = await this.sqliteDB.from('products').where({id: id});
            if(getProduct.length == 0) return undefined;
            return getProduct;
        } catch (error) {
            throw error;
        }
    }

    async add(data: ProductInterface): Promise<ProductInterface> {
        try {
            const newProduct: ProductInterface = {
                id: this.sqliteDB.default,
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment().format('DD MM YYYY hh:mm')}`
            }
            const addNewProduct = await this.sqliteDB.from('products').insert(newProduct);
            return newProduct;
        } catch (error) {
            throw error
        }
    }
    
    async delete(id:number) : Promise<void> {
        try {
            await this.sqliteDB('products').where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

    async update(id:number, newData:any): Promise<ProductInterface> {
        try {
            const update = await this.sqliteDB('products').where({id: id}).update(newData);
            return update;
        } catch (error) {
            throw error;
        }
    }
}