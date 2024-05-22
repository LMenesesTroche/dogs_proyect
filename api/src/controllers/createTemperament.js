// Importamos los módulos necesarios
const axios = require('axios');
const { Temperaments } = require("../DB");
const { Sequelize } = require('sequelize');

// Función asincrónica para crear un temperamento
async function createTemperament(req, res) {
    // Extraemos el temperamento del cuerpo de la solicitud HTTP
    let { temperamento } = req.body;

    // Creamos un nuevo registro de temperamento en la base de datos
    const creacion = await Temperaments.create({ name: temperamento });

    // Opcional: obtenemos todos los temperamentos de la base de datos (aunque no se usa en la respuesta)
    const temperamentos = await Temperaments.findAll();

    // Enviamos una respuesta HTTP con el nuevo temperamento creado y un estado 200 (OK)
    res.status(200).send(creacion);
}

// Exportamos la función para que pueda ser utilizada en otras partes de la aplicación
module.exports = createTemperament;
