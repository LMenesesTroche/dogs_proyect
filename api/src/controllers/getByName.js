const axios = require('axios'); //importamos axios para hacer la peticion get
const { Dog } = require('../db.js');
const { Sequelize } = require('sequelize');//Sequelize for to search on the database through JS
const URL = 'https://api.thedogapi.com/v1/breeds';

// const name = "AffenpinScher";//Nombre de prueba

//! Asi  se manda 
// localhost:3001/dogs/name?name=AffenpinScher 

//Debe devolver el perro que coincida con el nombre
async function getByName(req,res){
    try{        
        const { name } = req.query;//We take the name that the client send us trought query
        const nombreSinMayusculas = name.toLowerCase();//We convert it to lowe case

        //Sacamos todos los perros de nuestra database
        const arrDePerrosEnDb = await Dog.findAll({ 
            where: { name: Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('name')),nombreSinMayusculas) }}); //All this just to convert the name on the database befour search it
        //If the array of dogs on database is larger than 0 we send it to the front
        if(arrDePerrosEnDb.length > 0){
            return res.status(200).json(arrDePerrosEnDb);
        }else{
            //Si no hay base de datos: 
            let response = await axios.get(`${URL}`);  //hacemos la request

            const perroExterno = response.data.find(perro => perro.name.toLowerCase() === nombreSinMayusculas);//We search it on the API

            if(perroExterno){//If there was on the API we return it 
                return res.status(200).json(perroExterno);
            }else{
                return res.status(400).json("no hay perros");//If there is noting anyware we return the message there are not dogs
            }
        }
    }catch(error){
        console.log("error en getByName.js");
        res.status(500).send({message:error.message});
    }
}

module.exports = getByName;