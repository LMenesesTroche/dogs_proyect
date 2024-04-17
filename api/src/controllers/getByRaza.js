const axios = require('axios');
const { dog } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';

//Necesita devolverme los perros que tengan la raza mandada
async function getByRaza(req,res){
    
    let { raza } = req.params; //sacamos la raza que nos pasan por params
    if(raza === undefined || raza === null){
        res.status(400).json("La raza no esta definida");

    }
    const razaEnMinusculas = raza.toLowerCase();
    try{
        let response = await axios.get(`${URL}`);
        

        const arrayDePerros = response.data.map(async x => { 
            if(x.breed_group && razaEnMinusculas === x.breed_group.toLowerCase()){
                return{
                    id:x.id,
                    imagen:x.reference_image_id,
                    nombre: x.name,
                    temperamento:x.temperament,
                    peso:x.weight.imperial
                }  
            }
        }); 

        if(arrayDePerros.length<1){
            res.status(404).json("No se encontro la raza");
        }

        res.status(200).json(arrayDePerros);
        
        

    }catch(error){
        console.log("error en getByRaza.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getByRaza;