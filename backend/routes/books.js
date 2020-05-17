/* Aca voy a conectarme a la Base de Datos */

const { Router } = require('express');
const router = Router();
const fs = require('fs-extra');
const path = require('path');
const Book = require('../models/Books');

// //Creo mis rutas con router
// router.get('/', (req, res)=>{
//     res.send('HOLA MUNDO');
// });

router.get('/', async (req, res)=>{
    const books = await Book.find();
    res.json(books);
});

router.post('/', async (req, res)=>{
    //console.log(req.body);
    const { titulo, autor, id } = req.body;
    const imagePath = '/img/' + req.file.filename;

    const newBook = new Book({titulo, autor, id, imagePath});
    //Guardo el nuevo libro en la base de datos
    await newBook.save();
    //console.log(newBook);
    //res.send('Recibido');
    res.send({mensaje: 'Libro guardado'})
});

router.delete('/:id', async (req, res)=>{
    //console.log(req.params.id);
   // res.send('Libro eliminado de la Base de datos');
    const book = await Book.findByIdAndDelete(req.params.id);
   // console.log(book);
    fs.unlink(path.resolve('./backend/public/' + book.imagePath));
    res.send('Libro eliminado de la Base de datos');
})

module.exports = router;