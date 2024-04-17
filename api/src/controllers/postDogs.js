const axios = require("axios");
const { Dogs, Temperaments } = require("../db");


async function postDogs(req, res) {
    //Desestructuramos lo que nos manden por body
    const { id, img, name, height, weight, years, temperament ,breed_group } = req.body;
    try {
        //Comprobamos que esten todos los datos
        if (!id || !img || !name || !height|| !weight || !years || !temperament|| !breed_group) {
            return res.status(402).send({ message: 'Faltan datos' });
        }
        //Comprobamos que la imagen no sea rara
        if (img.length > 250) {
            return res.status(404).json({ message: "La URL de la imagen es muy larga" });
        }
        //Comprobamos que el perro no exista
        const findDog = await Dogs.findOne({ where: { name } });
        if (findDog) {
            return res.status(400).json({ message: 'El nombre del perro ya existe.' });
        }
        //Creamnos el perro si no existe
        const createDog = await Dogs.create({
            id, img, name, height, weight, years, temperament, breed_group
        });

        const temperamentosArray = temperament.split(',').map(t => t.trim());

        await Promise.all(temperamentosArray.map(async (temp) => {
            try {
                const [temper, created] = await Temperaments.findOrCreate({
                    where: { name: temp },
                    defaults: { name: temp }
                });
                if (temper) {
                    await createDog.addTemperaments(temper); // Utiliza el objeto creado para asociar temperamentos
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