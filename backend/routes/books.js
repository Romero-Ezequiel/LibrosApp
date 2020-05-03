/* Aca voy a conectarme a la Base de Datos */

const { Router } = require('express');
const router = Router();

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
    console.log(req.body);
    res.send('Recibido');
});

module.exports = router;