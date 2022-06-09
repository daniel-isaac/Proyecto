const express = require('express');
const app = express();
require('dotenv').config({debug:true});
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@cluster0.lcznb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Conexión exitosa al cluster mongodb'))
    .catch(e => console.log(e))

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