const axios = require('axios'); //importamos axios para hacer la peticion get
const { temperamentos } = require('./db.js');

const URL = 'https://api.thedogapi.com/v1/breeds';


//Debe devolver todos los comportamientos
async function getTemperaments(req,res){
    
    try{
        
        // SACARLOS DE LA API
        let response = await axios.get(`${URL}`);  //hacemos la request

        const arrDeTemperamentos = [];

        response.data.forEach(async(x)   =>{ // Buscamos todos los comportamientos y los ponemos en el array
            if( x.temperament !== undefined ){
                const separados = x.temperament.split(",");//posible error  por trim
                separados.forEach(async(y) => {
                    let em = {
                        name: y.trim()
                    }
                    const newTemperament = await temperamentos.findOrCreate({
                        where:{
                            name:em.name
                        }
                    });

                })

            }
        });

        const dbTemperamentos = await temperamentos.findAll(); 

        res.status(200).json(dbTemperamentos);

    }catch(error){
        console.log("error en getTemperaments.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getTemperaments;