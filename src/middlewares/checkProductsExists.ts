import {Request, Response, NextFunction } from 'express';
import { productsOperations } from '../apis/productsOperations';

export const checkProductExists = async (req: Request, res:Response, next: NextFunction) => {
    const {id} = req.params;

    const findProduct = await productsOperations.findOne(Number(id));
    if(findProduct) next();
    else res.status(404).json({
        error: 'El producto solicitado no existe.'
    })
}