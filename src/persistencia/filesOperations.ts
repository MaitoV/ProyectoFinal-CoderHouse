import path from 'path';
import fs from 'fs/promises';
import productInterface from './productInterface';
import moment from 'moment';


class FileOperations {
    pathFile (fileName: string) {
            return path.resolve(__dirname, `../../bd/${fileName}`)
    }
    async readFile (fileName:string): Promise < Array<productInterface> > {
        try {
            const path = this.pathFile(fileName)
            const db = await fs.readFile(path, 'utf-8');
            const dbParse = JSON.parse(db);
            return dbParse;
        } catch (e) {
            throw {
                status: 502,
                msg: 'Se produjo un error al intentar leer el archivo'
            }
        }
    }
    async writeFile (fileName:string, data: Array <productInterface>) {
        try {
            const filePath = this.pathFile(fileName);
            const dataToJSON = JSON.stringify(data, null, '\t');
            await fs.writeFile(filePath, dataToJSON);
        } catch (error) {
            throw {
                status: 502,
                msg: 'Se produjo un error al intentar escribir la base de datos'
            }
        }
    }
    async addNewItem (fileName:string, data: productInterface) {
        try {
            const db = await this.readFile(fileName);
            const newProduct = {
                id: db.length + 1,
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment().format('DD MM YYYY hh:mm')}`
            }
            db.push(newProduct);
            this.writeFile(fileName, db);
            return newProduct;  
        } catch (error) {
            throw {
                status: 502,
                msg: 'Se produjo un error al intentar guardar el producto'
            }
        }
    }
}

export const fileOperations = new FileOperations();