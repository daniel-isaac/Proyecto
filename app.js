const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

app.use('/', require('./router/Rutas'));
app.use('/juegos', require('./router/Videojuegos'));

app.use((req, res, next) => {
    res.send("error")
})

app.listen(port, () => {
    console.log('Iniciado en el puerto: ', port)
})