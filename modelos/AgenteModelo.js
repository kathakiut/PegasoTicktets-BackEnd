const mongoose = require("mongoose");
const agenteSchema = mongoose.Schema({  
    
    nombres: { type : String, maxLength: 80, required: true, unique: false },
    apellidos: { type : String, maxLength: 80, required: true, unique: false },
    documento:  { type : String, maxLength: 10, required: true, unique: true },
    rol: { type : String, maxLength: 80, required: true, unique: false },
    telefono : { type : String, required: true, unique: false },
    correo: { type : String, maxLength: 120, required: true, unique: true },
    usuario: { type : String, maxLength: 20, required: true, unique: true },
    password: { type : String,  required: true },
    es_admin: {type: Boolean, required: true, unique: false}
});

module.exports = mongoose.model("agentes", agenteSchema);