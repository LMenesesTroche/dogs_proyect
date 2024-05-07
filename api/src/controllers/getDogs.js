const axios = require('axios'); //importamos axios para hacer la peticion get
const { Dog } = require('../db');

const URL = 'https://api.thedogapi.com/v1/breeds';

async function getDogs(req,res){
    try{
        let response = await axios.get(`${URL}`);  //hacemos la request
        const arrDePerrosEnDb = await Dog.findAll({});
        const arrayPerros = response.data.map(x => { //mapeamos el objeto que nos devuelvela respuesta
          return {
            id: x.id,
            image: x.reference_image_id,
            name: x.name,
            temperament: x.temperament,
            weight: x.weight.metric, 
            fromDataBase: false,
            breed_group:x.breed_group,
            };
          }); 
          
        arrayPerros.push(...arrDePerrosEnDb);
        res.status(200).send(arrayPerros);


    }catch(error){
        console.log("error en getdogs.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getDogs;