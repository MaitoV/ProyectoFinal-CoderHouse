//Importamos nuestro servidor
import server from './services/server';

//Creamos la variable de puerto
const puerto = process.env.PORT || 8080; //Si tenemos definida la variable.port utilizara eso, si no por defecto 8080

//Ponemos a escuchar el servidor en ese puerto
server.listen(puerto, () => {
    console.log('Server corriendo en el puerto', puerto)
})