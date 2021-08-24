import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes'; //Agarra por defecto el index
//Creamos la aplicacion de express
const app = express();

//Seteamos nuestra carpeta public
const publicPathFolder = path.resolve(__dirname, '../../public');
app.use(express.static(publicPathFolder));

//Todo lo que empiece con /api se lo mando a mi apiRouter
app.use('/api', apiRouter);

//Creamos el server con el modulo de http
const httpServer = new http.Server(app);

//Exportamos el modulo del servidor
export default httpServer;