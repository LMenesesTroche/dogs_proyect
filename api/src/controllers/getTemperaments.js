const axios = require('axios'); 
const { Temperaments } = require('../db');

const URL = 'https://api.thedogapi.com/v1/breeds';


async function getTemperaments(req,res){
    
    try{
        
        let response = await axios.get(`${URL}`); 
        const arrDeTemperamentos = [];

        response.data.forEach(async(x)   =>{ 
            if( x.temperament !== undefined ){
                const separados = x.temperament.split(",");
                separados.forEach(async(y) => {
                    let em = {
                        name: y.trim()
                    }
                    const newTemperament = await Temperaments.findOrCreate({
                        where:{
                            name:em.name
                        }
                    });
                })
            }
        });
        const dbTemperamentos = await Temperaments.findAll({order: [['name','ASC']]}); 
        res.status(200).json(dbTemperamentos);

    }catch(error){
        console.log("error en getTemperaments.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getTemperaments;