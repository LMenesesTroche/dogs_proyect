const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/images';

//Necesita devolverme la raza y el temperamento de ese perro
async function getImagenes(req,res){

  let { img } = req.params; //sacamos la raza que nos pasan por params

  try{
    let response = await axios.get(`${URL}/${img}`);
    res.status(200).send(response.data.url);


  }catch(error){
      console.log("error en getImagenes.js");
      res.status(500).send({message:error.message});
  }
}

module.exports = getImagenes;