import {Request, Response, NextFunction} from 'express';
import {productsOperations} from '../persistencia/productsOperations';
class Producto { 
    checkProduct (req: Request, res: Response, next: NextFunction) {
        //Lo pasaremos como middleware al controlador
        //Middleware que verifique si el producto ya existe
    }
    async getProducts(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if(id){
                const product = await productsOperations.findOne(Number(id));
                if(product) {
                    return res.status(200).json({
                        data: product
                    })
                } else throw {
                    status: 404,
                    msg:'No se encontro el producto solicitado'
                }
            }

            const products = await productsOperations.getAll();
            //Agregar aca por si no hay productos
            return res.status(200).json({ data: products });

        } catch (error){
            return res.status(error.status).json({
                error: error.msg
            })
        }
    }

    async addProduct(req: Request, res: Response) {
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

        } catch (error){
            res.status(error.status).json({
                error: error.msg
            })
        } 
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const findProduct = await productsOperations.findOne(id);

            if(!findProduct){
                throw {
                    status: 404,
                    msg: 'El producto que estas intentando actualizar no existe'
                }
            }
            
            const updateProduct = await productsOperations.update(id, req.body, findProduct);
            res.status(201).json({
                msg: 'Producto actualizado con exito!',
                data: updateProduct
            })

        } catch (error) {
            res.status(error.status).json({
                error: error.msg
            })
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const findProduct = await productsOperations.findOne(id);
            if(!findProduct){
                throw {
                    status: 400,
                    msg: 'El producto que estas intentando eliminar no existe'
                }
            }

            const products = await productsOperations.delete(id);
            return res.status(200).json({
                msg: 'El producto se elimino exitosamente',
                data: products
            })

        } catch (error){
            res.status(error.status).json({
                error: error.msg
            })
        }

    }
}

export const productsController = new Producto();