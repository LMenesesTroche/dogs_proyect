const axios = require('axios');
const { Temperaments } = require('../DB');

const URL = 'https://api.thedogapi.com/v1/breeds';

//This is a async function that get the temperaments from all the dogs that we get from the API
async function getTemperaments(req, res) {

    try {

        let response = await axios.get(`${URL}`); //We take all the dogs and we put them on response

        //Hre we are taking all the temperament sentences and separetem them and save it them on the database
        response.data.forEach(async (x) => {
            if (x.temperament !== undefined) {
                const separados = x.temperament.split(",");
                separados.forEach(async (y) => {
                    let em = {
                        name: y.trim()
                    }
                    const newTemperaments = await Temperaments.findOrCreate({
                        where: {
                            name: em.name
                        }
                    });
                })
            }
        });
        //We take all the temperaments from our database and return them on alphabetical order
        const dbTemperamentos = await Temperaments.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(dbTemperamentos);

    } catch (error) {
        console.log("error en getTemperaments.js");
        res.status(500).send({ message: error.message });

    }
}

module.exports = getTemperaments;