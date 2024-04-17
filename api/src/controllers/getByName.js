const axios = require('axios'); //importamos axios para hacer la peticion get
const { dog } = require('../db.js');
const { Sequelize } = require('sequelize');

const URL = 'https://api.thedogapi.com/v1/breeds';

// const name = "AffenpinScher";//Nombre falso

//Debe devolver el perro que coincida con el nombre
async function getByName(req,res){
    try{        
        const { name } = req.query;
        const nombreSinMayusculas = name.toLowerCase();  
        
        //Sacamos todos los perros de nuestra database
        const arrDePerrosEnDb = await dog.findAll({ 
            where: { name: Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('name')),nombreSinMayusculas) }}); 
        
        if(arrDePerrosEnDb.length > 0){
            return res.status(200).json(arrDePerrosEnDb);
        }else{
            //Si no hay base de datos: 
            let response = await axios.get(`${URL}`);  //hacemos la request

            const perroExterno = response.data.find(perro => perro.name.toLowerCase() === nombreSinMayusculas);

            if(perroExterno){
                return res.status(200).json(perroExterno);
            }else{
                return res.status(400).json("no hay perros");
            }
        }
    }catch(error){
        console.log("error en getByName.js");
        res.status(500).send({message:error.message});
    }
}

module.exports = getByName;