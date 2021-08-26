"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importamos nuestro servidor
const server_1 = __importDefault(require("./services/server"));
//Creamos la variable de puerto
const puerto = process.env.PORT || 8080; //Si tenemos definida la variable.port utilizara eso, si no por defecto 8080
//Ponemos a escuchar el servidor en ese puerto
server_1.default.listen(puerto, () => {
    console.log('Server corriendo en el puerto', puerto);
});
