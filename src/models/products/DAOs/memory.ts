import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface, ProductI } from "../productsInterface";
import { memorySeeds } from "../../../db/seeds/memory-seeds";
import moment from "moment";

export class productsMemory implements ProductsClassDAOs {
    private productos: ProductI[];

    constructor() {
        this.productos = [];
        memorySeeds.forEach((aSeed) => { this.productos.push(aSeed)} )
    }

    async get(): Promise<ProductI[]> {
        return this.productos;
    }
    
    async getById(id: number): Promise<ProductI | undefined > {
        return this.productos.find(aProduct => aProduct.id == id);
    }

    async add(data: ProductInterface): Promise<ProductI> {
        const newProduct: ProductI = {
            id: this.productos.length + 1,
            name: data.name,
            description: data.description,
            code: data.code,
            photo: data.photo,
            price: data.price,
            stock: data.stock,
            timestamps: `${moment().format('DD MM YYYY hh:mm')}`
        }
        this.productos.push(newProduct)
        return newProduct;
    }

    async delete(id: number): Promise<void> {
        this.productos = this.productos.filter((aProduct) => aProduct.id !== id);
    }

    async update(id: number, newData:any): Promise<ProductI> {
        const oldData =  await this.getById(id);
        await this.delete(id);
        const updateData = {...oldData, ...newData};
        this.productos.push(updateData);
        this.productos = this.productos.sort((productA: ProductI, productB: ProductI) => productA.id - productB.id);

        return updateData;
    }
}