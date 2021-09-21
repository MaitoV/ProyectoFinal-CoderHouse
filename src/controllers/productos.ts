import {Request, Response, NextFunction} from 'express';
import {productsOperations} from '../apis/productsOperations';
import { ProductQuery } from '../models/products/productsInterface';
class Producto { 
    checkProduct (req: Request, res: Response, next: NextFunction) {
        //Lo pasaremos como middleware al controlador
        //Middleware que verifique si el producto ya existe
    }
    async getProducts(req: Request, res: Response) {
        try {
            const {id} = req.params;

            if(id){
                const findProduct = await productsOperations.findOne(id);
                if(!findProduct) return res.status(404).json({error: 'El producto solicitado no existe'})

                return res.status(200).json({
                    data: findProduct
                })
            }

            const queries: ProductQuery = {};
            const {name, price, stock, code} = req.query;
            if(name) queries.name = name.toString();
            if(price) queries.price = Number(price);
            if(stock) queries.stock = Number(stock);
            if(code) queries.code = code.toString();
            if(Object.keys(queries).length){
                const productsQueries = await productsOperations.findQuery(queries);
                return res.status(200).json({
                    data: productsQueries
                  });
            }

            const products = await productsOperations.getAll();
            return res.status(200).json({ data: products });

        } catch (error: any){
            return res.status(error.status).json({
                error: error.msg
            })
        }
    }

    async addProduct(req: Request, res: Response) {
        //TODO: validacion de los datos con un middleware
        const newProduct = await productsOperations.add(req.body); 
            //TODO:Validar si el producto ya existe
            return res.status(201).json({
                msg: "Producto creado con exito!",
                data: newProduct
        })
    }

    async updateProduct(req: Request, res: Response) {
        const dataToUpdate = req.body;
        const {id} = req.params;
        const updateProduct = await productsOperations.update(id, dataToUpdate);

        res.status(201).json({
            msg: 'Producto actualizado con exito!',
            data: updateProduct })   
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const products = await productsOperations.delete(id);
            return res.status(200).json({
                msg: 'El producto se elimino exitosamente',
                data: products })   

        } catch (error) {
            res.json({
                msg: error
            })
        }
    }
           

        /*try {
            const id = Number(req.params.id);

            const findProduct = await productsOperations.findOne(id);
            if(findProduct){
                const products = await productsOperations.delete(id);
                return res.status(200).json({
                msg: 'El producto se elimino exitosamente',
                data: products })   
            }
        } catch (error:any){
            res.status(error.status).json({
                error: error.msg
            })
        }*/

}


export const productsController = new Producto();