//Aca voy arrancar la aplicación, es decir voy a iniciar el codigo del servidor
//Con esto ya puedo leer archivos .env, con esto estoy especificando si luego 
//al desplegar la aplicacion el modulo dotenv no sera requerido y solamente 
//estamos requiriendo los modulos que estamos necesitando en produccion. Pero los 
//servicion como heroku o otros servicios de la nube nos permiter guardar nuestras
//variables de entorno desde una interfaz
if (process.env.NODE_ENV == 'En-Desarrollo'){
    /**Para especificar que voy a utilizar variables de entornos
     * utilizo el modulo dotenv para poder leer archivos .env**/
    require('dotenv').config();
}
//Me muestra el entorno de desarrollo, utilizando cross-env
console.log(process.env.NODE_ENV);
//Express me permite realizar un servidor de manera simple y poder realizar 
//la comunicacion entre cliente servidor de manera simple
const express = require('express');
//Este modulo me permiter ir viendo por consola las peticiones HTTP
const morgan = require('morgan');
//Este modulo me sirve para procesar imagenes
const multer = require('multer');
//Con este modulo voy a indicar la direccion actual del proyecto
const path = require('path');

//Inicializaciones
const app = express();
//Aca importo el modulo de la conexion de la base de datos
require('./database');

//Configuraciones
//Le indico con las variables de entorno un puerto. Indicandole que si existe un 
//puerto en la variable de entorno que lo tome, sino que tome el puerto que le indico
//que seria el puerto 4000. 
app.set('port', process.env.PORT || 4000);

//Middlewares, todos los middlewares de express son funciones
app.use(morgan('dev'));
//Configuracion el metodo diskStorage para subir imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    //el req es la informacion de la peticion del usuario,
    //el file es basicamente la informacion del archivo que me esta dando el usuario
    //y callback es la funcion que quiero que ejecute para que siga el programa
    filename(req, file, callback){
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
//Aca le indico con multer que voy a subir una sola imagen con single
app.use(multer({storage}).single('image'));
//Esto es para enviar datos atra vez de un formulario y poder interpretarlo
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Rutas
app.use('/api/books', require('./routes/books'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, '/public')));

//Arranco el servidor
app.listen(app.get('port'), ()=>{
    console.log('El servidor esta corriendo en el puerto', app.get('port'));
});