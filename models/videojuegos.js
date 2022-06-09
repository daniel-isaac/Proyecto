const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JuegosSchema = new Schema({
    nombre: String,
    genero: String,
    plataformas: String,
    año: String,
    descripcion: String,
    calificacion: Number
})

// crear modelo
const Juegos = mongoose.model('videojuegos', JuegosSchema);

module.exports = Juegos;