const axios = require('axios'); //importamos axios para hacer la peticion get

const URL = 'https://api.thedogapi.com/v1/breeds';


//Necesita devolverme todos los perros
async function getDogs(req,res){

    try{
        let response = await axios.get(`${URL}`);  //hacemos la request
        
        const arrayPerros = response.data.map(x => { //mapeamos el objeto que nos devuelvela respuesta
            return {
              id: x.id,
              image: x.reference_image_id,
              name: x.name,
              temperament: x.temperament,
              weight: x.weight.metric, // Creamos un array por cada raza
            };
          }); 

        res.status(200).send(arrayPerros);


    }catch(error){
        console.log("error en getdogs.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getDogs;