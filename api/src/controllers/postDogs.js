const axios = require("axios");
const { Dog, Temperaments } = require("../db");


async function postDogs(req, res) {
    //Desestructuramos lo que nos manden por body
    const {  name, height, weight, years, temperament ,breed_group } = req.body;
    try {
        //Comprobamos que esten todos los datos
        if ( !name || !height|| !weight || !years || !temperament|| !breed_group) {
            return res.status(402).send({ message: 'Faltan datos' });
        }

        //Comprobamos que el nombre del perro no este ocupado
        const findDog = await Dog.findOne({ where: { name } });
        if (findDog) {
            return res.status(200).json({ message: "El nombre del perro ya existe"});
        }
        
        //Creamnos el perro si no existe
        const createDog = await Dog.create({
             name, height, weight, years, temperament, breed_group
        });

        //TODO  REVISAR ESTO!!!
        await Promise.all(temperament.map(async (temp) => {
            try {
                //Creamos el temperamento que le ponen al perro si es que no existen ya
                const [temper, created] = await Temperaments.findOrCreate({
                    where: { name: temp },
                    defaults: { name: temp }
                });
                if (temper) {
                    await createDog.addTemperaments(temper); 
                }
            } catch (error) {
                console.error("Error al guardar el temperamento:", error);
                res.status(400).send({ message: "Error al guardar el temperamento" });
            }
        }));

        return res.status(201).json({ message: "Datos guardados correctamente" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = postDogs;