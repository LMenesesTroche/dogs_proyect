const { Dog } = require('../db')

//Esta funcion elimina algun perro que tengamos en la base de datos0
async function deleteDog (req, res){
    let { Id } = req.params; //sacamos la raza que nos pasan por params
    try{
        //Lo buscamos
        const hayElPerro = await Dog.findOne({ where: { id:Id }});
        //Si hay lo eliminamos
        if(hayElPerro){
            await hayElPerro.destroy();
            const todosLosPerros = await Dog.findAll();
            res.status(200).json({message:"Se elimino el perro exitosamente"});
        }else{//If the dog is not in the data base we send 400 error message 
            res.status(400).json({message:"No hay el perro que intentas eliminar"});
        }
    }catch(error){//If there is an error we catch it and send the error in message
        res.status(500).send({message:error.message});
    }
    
}

module.exports = deleteDog;