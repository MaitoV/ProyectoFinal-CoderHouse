import {Request, Response } from "express";
import {cartOperations} from '../persistencia/cartOperations';
import {productsOperations} from '../persistencia/productsOperations';

class Cart {
    async getCart(req: Request, res: Response) {
        if(req.params.id) {
            const findProduct = await cartOperations.findOne(Number(req.params.id));

            if(!findProduct) {
                return res.status(404).json({
                    error: 'El producto solicitado no existe en tu carrito'
                })
            }

            return res.status(200).json({
                data: findProduct
            })
        }

        const getCart = await cartOperations.getAll();
        return res.status(200).json({
            data: getCart
        })
    }    
    async addCartProduct(req: Request, res: Response){
        const id = Number(req.params.id);

        const findProduct = await productsOperations.findOne(id);

        if(!findProduct){
             return res.status(400).json({
                 error: 'El producto que estas intentando agregar al carrito no existe'
             })
        }

        const addToCart = await cartOperations.addCart(findProduct);
        return res.status(201).json({
            msg: 'Producto añadido exitosamente',
            data: addToCart
        })
    }
    async deleteCartProduct(req: Request, res: Response){
        const id = Number(req.params.id);

        const findProduct = await cartOperations.findOne(id);
        if(!findProduct) {
            return res.status(400).json({
                error: 'El producto que estas intentando eliminar no existe en tu carrito'
            })
        }

        const deleteProduct = await cartOperations.deleteCart(id);
        if(deleteProduct.length == 0) {
            return res.json({
                msg: 'Producto eliminado exitosamente, tu carrito ahora esta vacio!'
            })
        }
        
        return res.json({
            msg: 'Producto eliminado exitosamente',
            data: deleteProduct
        })
    }
}

export const cartController = new Cart(); 