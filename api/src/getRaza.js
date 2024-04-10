const axios = require('axios');

const URL = 'https://api.thedogapi.com/v1/breeds';

//Necesita devolverme los temperamentos de la raza que pida
async function getRaza(req,res){


  let { id } = req.params; //sacamos la raza que nos pasan por params
  
  try{

    let response = await axios.get(`${URL}`);  //hacemos la peticion

    let razaBuscada = response.data.filter(objeto => objeto.breed_group === id.id); //sacamos los datos de la raza


    const tempArr  = [];// array  para guardar los tipos de comportamientos


    razaBuscada.forEach((x) => tempArr.push(x.temperament));

    const objeto = {
      comportamientos:null
    }     
    
    const objetoMasArray = objeto.comportamientos= tempArr;

    res.status(200).json(objeto);

  }catch(error){
      console.log("error en getRaza.js");
      res.status(500).send({message:error.message});

  }
}

module.exports = getRaza;