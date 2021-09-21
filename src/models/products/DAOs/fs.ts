import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface, ProductI } from "../productsInterface";
import moment from "moment";
import fs from 'fs';
import path from 'path';
const filePath = path.resolve(__dirname, '../../../db/productsdb.json')


//TODO: agregar try y catch
export class productsFS implements ProductsClassDAOs {
    products: ProductI[];
    filePath: string;
    constructor(){
        this.filePath = filePath;
        this.products = [];
    }
    async readFile() : Promise<void> {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.filePath, 'utf-8'));
        } catch (error) {
           throw {
               status: 502,
               msg: 'Se produjo un error al intentar leer el archivo'
           }
        }
    }

    async writeFile(dataToSave: ProductInterface[]) : Promise<void> {
        try {
            const dataToJSON = JSON.stringify(dataToSave, null, '\t');
            await fs.promises.writeFile(this.filePath, dataToJSON);
        } catch (error) {
            throw {
                status: 502,
                msg: 'Se produjo un error al intentar escribir el archivo'
            }
        }
    }
    
    async get(): Promise<ProductInterface[]> {
        await this.readFile();
        return this.products;
    }

    async getById(productId: string): Promise<ProductI | undefined > {
        try {
            const id = Number(productId);
            await this.readFile();
            return this.products.find((aProduct) => aProduct.id === id);
        } catch (error) {
            throw error;
        }
    }

    async add(data: ProductInterface): Promise<ProductI> {
        try {
            await this.readFile();
            const newProduct: ProductI = {
                id: this.products.length + 1,
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment().format('DD MM YYYY hh:mm')}`
        }
        this.products.push(newProduct);
        await this.writeFile(this.products);
        return newProduct;

        } catch (error) {
            throw error;
        }
    }
    
    async delete(productId:string) : Promise<void> {
        try {
            const id = Number(productId);
            await this.readFile()
            this.products = this.products.filter((aProduct) => aProduct.id !== id);
            await this.writeFile(this.products);
        } catch (error) {
            throw error
        }
    }

    async update(productId:string, newData:any): Promise<ProductI> {
        try {
            const oldData = await this.getById(productId);
            await this.delete(productId);
            const updateData = {...oldData, ...newData};

            this.products.push(updateData);
            this.products.sort((productA: ProductI, productB: ProductI) => productA.id - productB.id); 

            await this.writeFile(this.products);

            return updateData;

        } catch (error) {
            throw error;
        }
    }

}