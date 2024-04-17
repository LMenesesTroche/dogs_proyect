const axios = require('axios');
const { Dogs } = require('../db');
const temperamentos = require('../models/temperaments');
const Sequelize  = 'sequelize';
const URL = 'https://api.thedogapi.com/v1/breeds';

//Necesita devolverme la raza y el temperamento de ese perro
async function getById(req,res){

  let { id } = req.params; //sacamos la raza que nos pasan por params

  try{
    //Pimero verificamos que haya el perro en la DB o en la api
    const perroDelId = await Dogs.findOne({ where: { id:id }, includes: temperamentos});
    let response = await axios.get(`${URL}/${id}`);

    if(perroDelId || response){
      if(perroDelId){
        res.status(200).json(perroDelId);
      }else{
        res.status(200).json(response.data);
      }
    }else{
      res.status(400).json("No hay datos");
    }


    
  }catch(error){
      console.log("error en getById.js");
      res.status(500).send({message:error.message});

  }
}

module.exports = getById;