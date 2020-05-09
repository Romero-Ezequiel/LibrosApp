/*Aca defino el modulo de la aplicacion en la base de datos, es decir como
van a mostrarse los datos en la base de datos es como definir una tabla. Podria
definir si el libro, tiene un titulo, autor, su id y todo eso lo guardaria en una 
base de datos. Para eso importo mongoose y requiero el Schema y el model para 
poder modelar mi base de datos  */


const { Schema, model } = require('mongoose');

//Instancio el Schema ya que es una clase y le indico un objeto como parametro.
//Dentro de ese objeto le voy a indicar todos los parametros que tengan los libros
const BookSchema = new Schema({
    //Que tenga un titulo
    titulo: { type: String, required: true},
    //Que tenga un autor 
    autor: { type: String, required: true},
    //Que tenga su id
    id: { type: String, required: true},
/** Vale aclarar que la imagen no voy a guardar en la base de datos ya que no es optimo
realizar esa practica en una aplicacion real. Entonces solamente voy a guardar la
direccion **/
   // imagePath: { type: String, required: true },
    imagePath: { type: String },

/** Que tenga una fecha de creacion, es decir que cuando se guarde un libro 
 * que indique su fecha de cuando fue creado
*/
    creadoEn: { type: Date, default: Date.now }
});

//Para utilizar este modulo en otras partes de la aplicacion tengo que exportarlo.
//Pero no voy a exportar el Schema sino un modelo, entonces ejecuto el metodo model
module.exports = model('Book', BookSchema); 