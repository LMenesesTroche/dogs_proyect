const axios = require('axios'); //importamos axios para hacer la peticion get
const { dog, temperamentosdb } = require('../db');

//Debe crear un nuevo perro y relacionarlo con los temperamentos asociandos 
async function postDogs(req,res){
    const dogData = req.body;


    try{        
        const { img, name, height, weight, years, breed_group, temperament } = req.body; //desestructuramos los datos

        if(!img || !name || !height || !weight|| !years|| !breed_group|| !temperament){ //verificamos que este todo
            res.status(400).json("Faltan datos");
        } 

        const newDog = await dog.create(dogData); // creamos el perro

        
        // if (temperament && temperament.length > 0) {
        //     const temperamentosEncontrados = await temperamentosdb.findAll({
        //       where: {
        //         name: temperamentos,
        //       },
        //     });
        // }

        // await newDog.addTemperamentos(temperamentosEncontrados);


        return res.json(newDog);


    }catch(error){
        console.log("error en postDogs.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = postDogs;