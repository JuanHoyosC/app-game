const {Schema, model} = require('mongoose');
const moment = require('moment');  
moment.locale('es'); 

const habitSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    dificultad: { type: String, required: true, trim: true },
    frecuencia: { type: String, required: true, trim: true },
    fecha: { type: String, required: true, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
    cumplido: { type: Boolean, required: true, default: false  },
    id_usuario: { type: String, required: true }
});


module.exports = model('habits', habitSchema);
