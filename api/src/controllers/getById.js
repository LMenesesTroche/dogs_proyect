const axios = require('axios');
const { dog } = require('../db');
const temperamentos = require('../models/temperamentos');

const URL = 'https://api.thedogapi.com/v1/breeds';

//Necesita devolverme los temperamentos de la raza que pida
async function getById(req,res){

  let { id } = req.params; //sacamos la raza que nos pasan por params

  try{
    
    let response = await axios.get(`${URL}/${id}`);
    
    const perroDelId = await dog.findOne({ where: { id:id }}); 
    
    res.status(200).json(perroDelId);


    // if(response){
    //   let { breed_group, temperament} = response.data;
    //   let dogRequest = {
    //     breed_group,
    //     temperament
    //   }
    //   res.status(200).json(dogRequest);
    // }else{
    //   res.status(400).json("Perro no encontrado");
    // }

  }catch(error){
      console.log("error en getById.js");
      res.status(500).send({message:error.message});

  }
}

module.exports = getById;