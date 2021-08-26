"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const admin = true;
const checkAdmin = (req, res, next) => {
    if (admin)
        next();
    else
        res.status(401).json({
            error: -1,
            descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no autorizada`,
            msg: 'No tienes permisos para realizar esa accion'
        });
};
exports.checkAdmin = checkAdmin;
