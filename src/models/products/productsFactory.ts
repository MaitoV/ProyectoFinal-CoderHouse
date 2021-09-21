import { productsMemory } from './DAOs/memory';
import { productsFS } from './DAOs/fs';
import { productsMySQL } from './DAOs/MySQL';
import { productsSQLite3 } from './DAOs/SQLite3';
import { productsMongo } from './DAOs/mongo';

export enum tipoDePersistencia {
    Memory = 'MEM',
    FileSystem = 'FS',
    MySQL = 'MySQL',
    SQLITE3 = 'SQLITE3',
    LocalMongo = 'LOCAL-MONGO',
    MongoAtlas = 'MONGO-ATLAS',
    Firebase = 'FIREBASE'
}

export class productsFactory {
    //Static nos permite usar el metodo sin crear una instancia
    static get(tipo: tipoDePersistencia) {
        switch(tipo){
            case tipoDePersistencia.FileSystem:
                return new productsFS();

            case tipoDePersistencia.MySQL:
                return new productsMySQL();
            
            case tipoDePersistencia.SQLITE3:
                const instanceSQLite3 = new productsSQLite3();
                instanceSQLite3.initDB();
                return instanceSQLite3;

            case tipoDePersistencia.LocalMongo:
                return new productsMongo();

           default: 
            return new productsMemory();
        }
    }
}