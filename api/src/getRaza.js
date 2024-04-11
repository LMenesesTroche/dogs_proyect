const axios = require('axios');
const { dog } = require('./db.js');

const URL = 'https://api.thedogapi.com/v1/breeds';

//Necesita devolverme los temperamentos de la raza que pida
async function getRaza(req,res){

  let { razaMandada } = req.params; //sacamos la raza que nos pasan por params

  try{
    const tempArr  = [];// array  para guardar los tipos de comportamientos
    
    //Sacamos todos los perros de nuestra database
    const arrayDePerrosEncontradosEnLaDB = await dog.findAll({ where: { breed_group: razaMandada }}); 
    //Ponemos solo los comportamientos encontrados en nuestro array
    arrayDePerrosEncontradosEnLaDB.forEach((x) => tempArr.push(x.temperament));


    let response = await axios.get(`${URL}`);  //hacemos la peticion

    let razaBuscada = response.data.filter(objeto => objeto.breed_group === razaMandada); //sacamos los datos de la raza

    //Por cada uno de "razaBuscada" sacamos el temperamento y lo ponemos en temp.arr
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