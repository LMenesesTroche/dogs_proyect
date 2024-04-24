const axios = require('axios');
const { Dog } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';
const { Sequelize } = require('sequelize');

//Necesita devolverme los perros que tengan la raza mandada
async function getByRaza(req,res){
    
    let { raza } = req.params; //sacamos la raza que nos pasan por params
    
    if(raza === undefined || raza === null){
        res.status(400).json("La raza no esta definida");
    }
    //convertimos la raza a minusculas
    const razaEnMinusculas = raza.toLowerCase();
    try{
        let response = await axios.get(`${URL}`);
        //mapeamos el array de perros y filtramos por raza
        let arrayDePerros = response.data.map( x => { 
            if(x.breed_group && razaEnMinusculas === x.breed_group.toLowerCase()){
                return{
                    id:x.id,
                    image:x.reference_image_id,
                    name: x.name,
                    temperament:x.temperament,
                    weight:x.weight.imperial
                }  
            }
        }); 
        let perrosEnApiSinNull = [];
        arrayDePerros.forEach(element => {
            if(element){
                perrosEnApiSinNull.push(element);
            }
        });

        const arrDePerrosEnDb = await Dog.findAll({ 
            where: { breed_group: Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('breed_group')),razaEnMinusculas) }});
        
        const dbyApi = arrDePerrosEnDb.concat(perrosEnApiSinNull);

        //si no hay perros de esa raza
        if(dbyApi.length<1){
            return res.status(200).json({message: "We don't have that breed of dog."} );
        }
        res.status(200).json(dbyApi);
    }catch(error){
        console.log("error en getByRaza.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getByRaza;