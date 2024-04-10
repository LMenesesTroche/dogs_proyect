const axios = require('axios'); //importamos axios para hacer la peticion get

const URL = 'https://api.thedogapi.com/v1/breeds';

const name = "Hueso";//Nombre falso

//Debe devolver todas las razas de perros que coinciden con el nombre recibido por query
async function getByName(req,res){
    
    try{        
        let response = await axios.get(`${URL}`);  //hacemos la request
        const { nam } = req.query;//nos mandan por el URL

        const razas  = [];
        const nombreSinMayusculas = name.toLowerCase();  

        response.data.forEach((x)   =>{ // Buscamos todos los objetos de perros que coincidan con la raza
            if(nombreSinMayusculas === x.name){
                razas.push(x.breed_group)  // Los pusheamos a razas
            }}
        );
        if(razas.length ===  0 ){
            res.status(400).json("No hay esa raza");

        }

    }catch(error){
        console.log("error en getByName.js");
        res.status(500).send({message:error.message});

    }
}

module.exports = getByName;