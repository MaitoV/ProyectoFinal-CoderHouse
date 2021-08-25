import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index'; //Agarra por defecto el index
//Creamos la aplicacion de express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Seteamos nuestra carpeta public
const publicPathFolder = path.resolve(__dirname, '../../public');
app.use(express.static(publicPathFolder));


app.use('/api', apiRouter);

//Creamos el server con el modulo de http
const httpServer = new http.Server(app);

//Exportamos el modulo del servidor
export default httpServer;