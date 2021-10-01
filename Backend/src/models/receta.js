const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id_creador:String,
    titulo: String,
    descripcion: String,
    imagen: String,
    preparacion: String,
    ingrediente: String,
    nota: String,
    categoria: String,
    calificacion: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = model('receta', userSchema);