const axios = require('axios'); //importamos axios para hacer la peticion get
const { dog, temperaments, dogTemperaments } = require('../db');

//Debe crear un nuevo perro y relacionarlo con los temperamentos asociandos 
async function postDogs(req,res){
    const dogData = req.body;
    try{        
        //! POSTEMOS EL PERRO EN DOGS
        const { img, name, height, weight, years, breed_group, temperament } = req.body; //desestructuramos los datos

        if(!img || !name || !height || !weight|| !years|| !breed_group|| !temperament){ //verificamos que este todo
            res.status(400).json("Faltan datos");
        } 
        
        const dogPosted = await dog.findOrCreate({ 
            where:{ img, name, height, weight, years, breed_group, temperament },
            defaults:{ img, name, height, weight, years, breed_group, temperament } 
        });
        //! Sacamos el id del perro creado
        const allDogsDb = await dog.findAll();

        let id = null;

        const buscarIdDelPerro = allDogsDb.map(async x => { 
            if(x.name  === name){
                id = x.id;
            }
        }); 
        //!Sacamos los temperamentos del perro en un array 
        const temperamentosSeparados = temperament.split(",");
        
        
        //! HACEMOS LA RELACION DE TEMPERAMENTOS Y PERROS 
        const temepramentosYPerros = await dogTemperaments.create({ 
            
        });
        
        res.status(200).json(temperamentosSeparados);

    }catch(error){
        console.log("error en postDogs.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = postDogs;