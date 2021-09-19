import {Request, Response, NextFunction } from 'express';
import { productsOperations } from '../apis/productsOperations';

export const checkProductExists = async (req: Request, res:Response, next: NextFunction) => {
    const {id} = req.params;

    const findProducto = await productsOperations.findOne(Number(id));
    if(findProducto) next();
    else res.status(404).json({
        error: 'El producto solicitado no existe.'
    })
}