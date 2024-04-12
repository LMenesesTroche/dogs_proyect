const axios = require('axios');
const { dog } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';

//Necesita devolverme la raza y el temperamento de ese perro
async function getById(req,res){

  let { id } = req.params; //sacamos la raza que nos pasan por params

  try{
    //Pimero verificamos que haya el perro en la DB o en la api
    const perroDelId = await dog.findOne({ where: { id:id }});
    let response = await axios.get(`${URL}/${id}`);

    if(perroDelId || response.data){
      if(perroDelId){
        const { breed_group, temperament } = perroDelId;
        if(!breed_group||!temperament){
          res.status(200).json("faltan datos");  
        }else{
          res.status(200).json({ breed_group, temperament});  
        }
        
      }else{
        const { breed_group, temperament } = response.data;
        if(!breed_group||!temperament){
          res.status(200).json("faltan datos");  
        }else{
          res.status(200).json({ breed_group, temperament});  
        }
      }
    }else{
      res.status(400).json("No hay el perro que buscas");
    }

  }catch(error){
      console.log("error en getById.js");
      res.status(500).send({message:error.message});

  }
}

module.exports = getById;