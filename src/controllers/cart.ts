import {Request, Response } from "express";
import {cartOperations} from '../persistencia/cartOperations';
import {productsOperations} from '../persistencia/productsOperations';

class Cart {
    async getCart(req: Request, res: Response) {
        try {
            if(req.params.id) {
                const findProduct = await cartOperations.findOne(Number(req.params.id));
                return res.status(200).json({
                        data: findProduct });
            }
            const getCart = await cartOperations.getAll();
            return res.status(200).json({
            data: getCart })

        } catch (error) {
            res.status(error.status).json({
                error: error.msg
            })
        }
    }
    

    async addCartProduct(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const findProduct = await productsOperations.findOne(id);

            if(findProduct){
                const addToCart = await cartOperations.addCart(findProduct);
                return res.status(201).json({
                    msg: 'Producto añadido exitosamente',
                    data: addToCart
                })    
            }
        } catch (error) {
            res.status(error.status).json({
                error: error.msg
            })
        }
    }

    async deleteCartProduct(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const findProduct = await cartOperations.findOne(id);
            if(findProduct) {
                const deleteProduct = await cartOperations.deleteCart(id);

                return res.json({
                    msg: 'Producto eliminado exitosamente',
                    data: deleteProduct
                })
            }
        } catch (error) {
            res.status(error.status).json({
                msg: error.msg
            })
        }
    }
}

export const cartController = new Cart(); 