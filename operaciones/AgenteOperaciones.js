const agenteModelo = require("../modelos/AgenteModelo");
const bcrypt = require("bcrypt");
const agenteOperaciones = {}

const cifrarPassword = async (password) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(password, salt);
}



agenteOperaciones.crearAgente = async (req, res) => {
    try {
        const body = req.body;
        body.password = await cifrarPassword(body.password);
        const agente = new agenteModelo(body);
        const agenteGuardado = await agente.save();
        res.status(201).send(agenteGuardado);
    } catch (error) {
        res.status(400).json(error);
    }
}

agenteOperaciones.buscarAgentes = async (req, res) => {
    try {
        const query = req.query;
        let listaagentes;
        if (query.q != null) {
            listaagentes = await agentesModelo.find({
                "$or": [
                    { "nombres": { $regex: query.q, $options: "i"}},
                    { "apellidos": { $regex: query.q, $options: "i"}},
                    { "documento": { $regex: query.q, $options: "i"}},
                    { "usuario": { $regex: query.q, $options: "i"}}
                ]
            });
        }
        else {
            listaagentes = await agenteModelo.find(query);
        }
        if (listaagentes.length > 0) {
            res.status(200).send(listaagentes);

        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
}

agenteOperaciones.buscarAgente = async (req, res) => {
    try {
        const id = req.params.id;
        const agente = await agenteModelo.findById(id);
        if (agente != null) {
            res.status(200).send(agente);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
}

agenteOperaciones.modificarAgente = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (body.password != null) {
            body.password = await cifrarPassword(body.password);
        }
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            rol: body.rol,
            direccion: body.direccion,
            telefono: body.telefono,
            correo: body.correo,
            usuario: body.usuario,
            password: body.password,
            es_admin: body.es_admin
        }
        const agenteActualizado = await agenteModelo.findByIdAndUpdate(id, datosActualizar, { new: true });
        if (agenteActualizado != null) {
            res.status(200).send(agenteActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
}




agenteOperaciones.borrarAgente = async (req, res) => {
    try {
        const id = req.params.id;
        const agente = await agenteModelo.findByIdAndDelete(id);
        if (agente != null) {
            res.status(200).send(agente);
        } else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " + error);
    }
}

module.exports = agenteOperaciones;