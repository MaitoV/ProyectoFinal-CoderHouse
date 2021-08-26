import {Request, Response } from "express";
import {cartOperations} from '../persistencia/cartOperations';

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
    addCartProduct(req: Request, res: Response){

    }
    deleteCartProduct(req: Request, res: Response){

    }
}

export const cartController = new Cart(); 