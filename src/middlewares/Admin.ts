import {Request, Response, NextFunction } from 'express';
const admin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(admin) next()
    else res.status(401).json({
        error: -1,
        descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no autorizada`,
        msg: 'No tienes permisos para realizar esa accion'
    })
}
