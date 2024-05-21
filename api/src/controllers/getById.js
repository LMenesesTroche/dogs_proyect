const axios = require('axios');//Axios for extract from the API
const { Dog } = require('../db');// Dog is the model ofour database 
const URL = 'https://api.thedogapi.com/v1/breeds/';

//Necesita devolverme la raza y el temperamento de ese perro
async function getById(req,res){

  let { id } = req.params; //sacamos la raza que nos pasan por params

  try{
    let response = await axios.get(`${URL}`);//We take the information from the URL (API)
    const perroExterno = response.data.find((perro) => perro.id == id);//We Search the id on the data of the API nand we put ot on "perroExterno"

    if(perroExterno){//If there is someting on perroExterno 
      perroExterno.fromDatabase = false;//We say that is not from database, because we found it on the API
      res.status(200).json(perroExterno);//And we send the information of the dog
    }else{
      const perroenDb = await Dog.findOne({ where: { id:id }});  // If there is noting on perroExterno we search the id on our database
      if(perroenDb){//if the dog is on database, there will be someting on perroEnDB
        res.status(200).json(perroenDb);//So we send the info 
      }else{
        res.status(400).json("No hay el perro que buscas");//If there is no dog on the API or on our DB we send the message
      }
    }

  }catch(error){
      console.log("error en getById.js");
      res.status(500).send({message:error.message});//We catch the error and send it

  }
}

module.exports = getById;//We export the function