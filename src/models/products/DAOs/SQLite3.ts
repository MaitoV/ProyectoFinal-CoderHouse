import knex from "knex";
import { ProductsClassDAOs, ProductQuery, ProductInterface } from "../productsInterface";
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
            productsTable.increments('id').primary();
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
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment().format('DD MM YYYY hh:mm')}`
            }
            await this.sqliteDB.from('products').insert(newProduct);
            return newProduct;
        } catch (error) {
            throw error
        }
    }
    
    async delete(productId:string) : Promise<void> {
        try {
            const id = Number(productId);
            await this.sqliteDB('products').where({id: id}).del();
        } catch (error) {
            throw error;
        }
    }

    async update(productId:string, newData:any): Promise<ProductInterface> {
        try {
            const id = Number(productId);
            const update = await this.sqliteDB('products').where({id: id}).update(newData);
            return update;
        } catch (error) {
            throw error;
        }
    }

    async query(queries: ProductQuery ) {
        try {
            const findProduct = await this.sqliteDB.from('products').where(queries);
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