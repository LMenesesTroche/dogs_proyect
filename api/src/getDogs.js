const axios = require('axios'); //importamos axios para hacer la peticion get

const URL = 'https://api.thedogapi.com/v1/breeds';


//Necesita devolverme un arreglo de objetos donde cada objeto es la raza de un perro
async function getDogs(req,res){

    try{
        let response = await axios.get(`${URL}`);  //hacemos la request
        const arrayDeRazas = response.data.map(breed => { //mapeamos el objeto que nos devuelvela respuesta
            return {
              name: breed.name, // Creamos un array por cada raza
            };
          }); 

        res.status(200).send(arrayDeRazas);


    }catch(error){
        console.log("error en getdogs.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getDogs;