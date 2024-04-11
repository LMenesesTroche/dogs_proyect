const axios = require('axios'); //importamos axios para hacer la peticion get
const { dog } = require('./db.js');
const { Sequelize } = require('sequelize');

const URL = 'https://api.thedogapi.com/v1/breeds';

const name = "AffenpinScher";//Nombre falso

//Debe devolver todas las razas de perros que coinciden con el nombre recibido por query
async function getByName(req,res){
    
    try{        
        const razas  = [];

        let response = await axios.get(`${URL}`);  //hacemos la request
        // const { nam } = req.query;//nos mandan por el URL
        
        const nombreSinMayusculas = name.toLowerCase();  

        //Sacamos todos los perros de nuestra database
        const arrDePerrosEnDb = await dog.findAll({ where: { name: Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('name')),nombreSinMayusculas) }}); 


        arrDePerrosEnDb.forEach((x)   =>{ // Buscamos todos los objetos de perros que coincidan con la raza
            if(nombreSinMayusculas === x.name.toLowerCase()){
                razas.push(x.breed_group)  // Los pusheamos a razas
            }}
        );


        response.data.forEach((x)   =>{ // Buscamos todos los objetos de perros que coincidan con la raza
            if(nombreSinMayusculas === x.name.toLowerCase()){
                razas.push(x.breed_group)  // Los pusheamos a razas
            }}
        );

        if(razas.length ===  0 ){
            res.status(400).json("No resultados");
        }
        res.status(400).json(razas);


    }catch(error){
        console.log("error en getByName.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getByName;