import {ProductInterface, ProductsClassDAOs, ProductII, ProductQuery, ProductI } from '../productsInterface';
import moment from 'moment';
import mongoose from 'mongoose';


const productsSchema = new mongoose.Schema<ProductII>({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, max: 70},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    photo: {type: String, required: true},
    code: {type: String, required: true},
    description: {type: String, required: true},
    timestamps: {type: String, required: true, default: moment().format('DD/MM/YYYY HH:mm:ss')}
});
export class productsMongo implements ProductsClassDAOs {
    private mongoDB: string;
    private productsModel;
    constructor(local: boolean = false) {
        if(local) {
            this.mongoDB = `mongodb://localhost:27017/ecommerce`;
        } else {
            this.mongoDB = `mongodb+srv://roboti:CoderHouseTest1234@cluster0.nodly.mongodb.net/ecommerceCH?retryWrites=true&w=majority`
        }
        mongoose.connect(this.mongoDB);
        this.productsModel = mongoose.model<ProductII>('products', productsSchema)
    }

    async get(): Promise<ProductII[]> {
        try {
            const productsList = await this.productsModel.find({}).sort({title: 1})
            if(productsList.length == 0) throw({
                status: 404,
                msg: 'Todavia no hay productos cargados en tu base de datos'
            })

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getById(productId: string): Promise< ProductII | undefined > { 
        try {
            if(productId.length !== 24) throw({
                status: 400,
                msg: 'El id ingresado es incorrecto'
            })
            const getProduct = await this.productsModel.findById(productId);
           if(!getProduct) throw({
               status: 404,
               msg: 'El producto solicitado no existe'
           })
            return getProduct;
        } catch (error) {
            throw error;
        }
    }

    async add(data: ProductInterface): Promise<ProductII> {
        try {
            const newProduct: ProductII = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment().format('DD MM YYYY hh:mm')}`
            }
            const addProduct = await this.productsModel.create(newProduct);
            return addProduct;
        } catch (error) {
            throw error
        }
    }
    
    async delete(productId:string) : Promise<void> {
        try {
            await this.productsModel.deleteOne({_id: productId});
        } catch (error) {
            throw error;
        }
    }

    async update(productId:string, newData:any): Promise<ProductII> {
        try {
            const update = await this.productsModel.findOneAndUpdate({_id: productId}, newData, {new: true});
            return update;
        } catch (error) {
            throw error;
        }
    }

    async query(queries: ProductQuery) : Promise< ProductII | ProductII[]> {
        try {
            const findProduct = await this.productsModel.find(queries);
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