import {Request, Response, NextFunction} from 'express';
import {productsOperations} from '../apis/productsOperations';
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
            //Validar si el producto ya existe
            return res.status(201).json({
                msg: "Producto creado con exito!",
                data: newProduct
        })
        /*
        try {
            const {name, description, code, photo, price, stock} = req.body;
            //Mejorar validacion
            if(!name || !price || !description || !code || !photo || !stock ){
                throw {
                    status: 400,
                    msg: 'La informacion ingresada es incorrecta'
                }
            }

            const newProduct = await productsOperations.add(req.body); 
            //Validar si el producto ya existe
            return res.status(201).json({
                msg: "Producto creado con exito!",
                data: newProduct
            })

        } catch (error:any){
            res.status(error.status).json({
                error: error.msg
            })
        } */
    }

    async updateProduct(req: Request, res: Response) {
        //TODO: Que pasa si nos pasan un producto que no existe
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