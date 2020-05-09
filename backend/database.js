/*Importo el modulo de mongoose para conectarme a la base de datos*/
const mongoose = require('mongoose');

/**Utilice variables de entorno para reemplazar la cadena de conexion a la 
base de datos. La razon de que quite la cadena de conexion de la base de datos 
es que voy la guardar en otro archivo llamado .env, dentro de este archivo voy
a guardar cadenas de conexion, contraseñas, token, para definir el puerto
del servidor y demás. Esto me permite darle más seguridad a la aplicacion
**/

//Muestro por consola la cadena de conexion a la base de datos, 
//traida desde las variables de entornos
console.log(process.env.MONGODB_URL);

//Conecto la base de dato utilizando connect
// mongoose.connect('mongodb://localhost/javascriptdb', {
//    useNewUrlParser: true
// })

/**Ahora para conectar a la base de datos con mongoose.
 *  En vez de conectar la cadena de conexion de la BD, simplemente le digo
 * que utilice process.env.MONGODB_URL, es decir ya no tengo que tipear toda
 * la ruta de conexion sino no indico con las variables de entorno ya que la ruta
 * de conexion esta en otro archivo de la aplicacion. 
**/
mongoose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useFindAndModify: true,
   useUnifiedTopology: true
})

//Cuando la base de datos se conecte, nos puede dar dos eventos, un evento
//que nos indica que se conecto a la base de dato de manera correcta y otro un error.
//En los dos casos envio un mensaje por consola para verificar el evento.
//Para eso utilizo promesas para capturar los eventos

   .then(db => console.log('La Base de datos está conectada'))
   .catch(err => console.log(err));