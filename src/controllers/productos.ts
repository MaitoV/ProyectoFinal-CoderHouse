import {Request, Response} from 'express';
import {productsOperations} from '../persistencia/productos';

let productos = [
    {id:1, nombre:"lapiz",precio:200},
    {id:2, nombre:"mochila",precio:500}
]

class Producto { 
    getProducts(req: Request, res: Response) {

        const id = req.params.id;
        if(id){
            const product = productsOperations.findOne(Number(id));
            if(!product) {
                return res.status(404).json({
                    error: "No se encontro el producto solicitado"
                })
            }
            return res.status(200).json({
                data: product
            })
        }

        const products = productsOperations.getAll();
        return res.json({ data: products });
    }

    addProduct(req: Request, res: Response) {
        const {name, description, code, photo, price, stock} = req.body;

        
        if(!name || !price || !description || !code || !photo || !stock ){
            return res.status(400).json({error: 'La informacion ingresada es incorrecta'})
        }
        const newProduct = productsOperations.add(req.body); 

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

       const deleteProduct = productsOperations.delete(Number(req.params.id));
       return res.status(200).json({
           msg: 'El producto se elimino exitosamente',
           data: deleteProduct
       })
    }
}

export const productsController = new Producto();