//Aca voy arrancar la aplicación, es decir voy a iniciar el codigo del servidor
//Con esto ya puedo leer archivos .env
if (process.env.NODE_ENV == 'En-Desarrollo'){
    require('dotenv').config();
}

console.log(process.env.NODE_ENV);
//Express me permite realizar un servidor de manera simple y poder realizar 
//la comunicacion entre cliente servidor de manera simple
const express = require('express');
//Este modulo me permiter ir viendo por consola las peticiones HTTP
const morgan = require('morgan');
//Este modulo me sirve para procesar imagenes
const multer = require('multer');
const path = require('path');

//Inicializaciones
const app = express();
require('./database');

//Configuraciones
//Le indico con las variables de entorno un puerto. Indicandole que si existe un 
//puerto en la variable de entorno que lo tome, sino que tome el puerto que le indico
//que seria el puerto 4000. 
app.set('port', process.env.PORT || 4000);

//Middlewares, todos los middlewares de express son funciones
app.use(morgan('dev'));
//Configuracion para subir imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename(req, file, callback){
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
});
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