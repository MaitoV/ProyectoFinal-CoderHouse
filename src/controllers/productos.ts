import {Request, Response} from 'express';
import {productsOperations} from '../persistencia/productsOperations';
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
        return res.status(200).json({ data: products });
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

    updateProduct(req: Request, res: Response) {
        const id = Number(req.params.id);

        const findProduct = productsOperations.findOne(id);

        if(findProduct == undefined){
            return res.status(404).json({
                error: "El producto que estas intentando actualizar no existe"
            })
        }
        
        const updateProduct = productsOperations.update(id, req.body, findProduct);
        res.status(201).json({
            msg: 'Producto actualizado con exito!',
            data: updateProduct
        })
    }

    deleteProduct(req: Request, res: Response) {
        const id = Number(req.params.id);

        const findProduct = productsOperations.findOne(id);
        if(!findProduct){
            return res.status(400).json({
                error: "El producto no existe"
            })
        }

       const products = productsOperations.delete(id);
       return res.status(200).json({
           msg: 'El producto se elimino exitosamente',
           data: products
       })
    }
}

export const productsController = new Producto();