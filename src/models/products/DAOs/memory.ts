import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface, ProductI, ProductQuery } from "../productsInterface";
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
    
    async getById(productId: string): Promise<ProductI | undefined > {
        const id = Number(productId);
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

    async delete(productId: string): Promise<void> {
        const id = Number(productId);
        this.productos = this.productos.filter((aProduct) => aProduct.id !== id);
    }

    async update(productId: string, newData:any): Promise<ProductI> {
        const oldData =  await this.getById(productId);
        await this.delete(productId);
        const updateData = {...oldData, ...newData};
        this.productos.push(updateData);
        this.productos = this.productos.sort((productA: ProductI, productB: ProductI) => productA.id - productB.id);

        return updateData;
    }

    async query(queries: ProductQuery ) {
        try {
            type Conditions = (aProduct: ProductI) => boolean;
            const query: Conditions[] = [];

            if (queries.name) query.push((aProduct: ProductI) => aProduct.name == queries.name);
            if (queries.price) query.push((aProduct: ProductI) => aProduct.price == queries.price);
            if (queries.stock) query.push((aProduct: ProductI) => aProduct.stock == queries.stock);
            if (queries.code) query.push((aProduct: ProductI) => aProduct.code == queries.code);

            const findProduct = this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
            if(findProduct.length == 0) throw({
                status: 404,
                msg: 'No se encontro ningun producto con los filtros proporcionados.'
            })
        } catch (error) {
            throw error;
        }
    }
}