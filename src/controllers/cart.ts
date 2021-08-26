import {Request, Response } from "express";
import {cartOperations} from '../persistencia/cartOperations';
import {productsOperations} from '../persistencia/productsOperations';

class Cart {
    getCart(req: Request, res: Response) {
        if(req.params.id){
            const findProduct = cartOperations.findOne(Number(req.params.id));

            if(!findProduct) {
                return res.status(404).json({
                    error: 'El producto solicitado no existe en tu carrito'
                })
            }

            return res.status(200).json({
                data: findProduct
            })
        }

        const getCart = cartOperations.getAll();
        return res.status(200).json({
            data: getCart
        })
    }    
    addCartProduct(req: Request, res: Response){/*
        const id = Number(req.params.id);

        const findProduct = productsOperations.findOne(id);

        if(!findProduct){
             return res.status(400).json({
                 error: 'El producto que estas intentando agregar al carrito no existe'
             })
        }

        const addToCart = cartOperations.addCart(findProduct);
        return res.status(201).json({
            msg: 'Producto añadido exitosamente',
            data: addToCart
        })
    */}
    deleteCartProduct(req: Request, res: Response){
        const id = Number(req.params.id);

        const findProduct = cartOperations.findOne(id);
        if(!findProduct) {
            return res.status(400).json({
                error: 'El producto que estas intentando eliminar no existe en tu carrito'
            })
        }

        const deleteProduct = cartOperations.deleteCart(id);
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