const axios = require('axios'); //importamos axios para hacer la peticion get
const { dog } = require('./db');

//Debe crear un nuevo perro y relacionarlo con los temperamentos asociandos 
async function postDogs(req,res){
    const dogData = req.body;


    try{        
        const newDog = await dog.create(dogData);
        return res.json(newDog);


    }catch(error){
        console.log("error en postDogs.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = postDogs;