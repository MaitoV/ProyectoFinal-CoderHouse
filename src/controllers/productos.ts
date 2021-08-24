import {Request, Response} from 'express';

let productos = [
    {id:1, nombre:"lapiz",precio:200},
    {id:2, nombre:"mochila",precio:500}
]

class Producto { 
    async getProducts(req: Request, res: Response) {
        const id = req.params.id;
        if(id) {
            const producto = productos.find(aProduct => aProduct.id == Number(id));
            if(!producto) res.status(404).json({
                msg: "producto no encontrado"
            })
            return res.status(200).json({
                data: producto
            })
        }

        res.json({ data: productos })
    }

    async addProduct(req: Request, res: Response) {
        const {nombre, precio} = req.body;
        if(!nombre || !precio || typeof nombre !== "string" || typeof precio !== "number") {
            return res.status(400).json({error: 'La informacion ingresada es incorrecta'})
        }
        const newProduct = {
            id: productos.length + 1,
            nombre: nombre,
            precio: precio
        }
        productos.push(newProduct);

        return res.status(201).json({
            msg: "Producto creado con exito!",
            data: newProduct
        })
    }

    async updateProduct(req: Request, res: Response) {

    }

    async deleteProduct(req: Request, res: Response) {
        if(!req.params.id){
            return res.status(400).json({
                error: 'No se envio un id valido'
            })
        }

        const productIndex = productos.find(aProduct => aProduct.id == Number(req.params.id));
        if(!productIndex){
            res.status(400).json({
                error: 'El producto no existe'
            })
        }

       productos = productos.filter(aProduct => aProduct.id !== Number(req.params.id))
       return res.status(200).json({
           msg: 'El producto se elimino exitosamente',
           data: productos
       })
    }
}

export const productsController = new Producto();