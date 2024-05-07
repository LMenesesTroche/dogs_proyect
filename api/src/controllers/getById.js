const axios = require('axios');
const { Dog } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds/';

//Necesita devolverme la raza y el temperamento de ese perro
async function getById(req,res){

  let { id } = req.params; //sacamos la raza que nos pasan por params

  try{
    let response = await axios.get(`${URL}`);
    const perroExterno = response.data.find((perro) => perro.id == id);

    if(perroExterno){
      perroExterno.fromDatabase = false;
      res.status(200).json(perroExterno);
    }else{
      const perroenDb = await Dog.findOne({ where: { id:id }});
      if(perroenDb){
        res.status(200).json(perroenDb);
      }else{
        res.status(400).json("No hay el perro que buscas");
      }
    }

  }catch(error){
      console.log("error en getById.js");
      res.status(500).send({message:error.message});

  }
}

module.exports = getById;