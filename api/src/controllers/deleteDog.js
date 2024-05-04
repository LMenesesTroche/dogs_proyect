const { Dog } = require('../db')

async function deleteDog (req, res){
    let { Id } = req.params; //sacamos la raza que nos pasan por params
    try{
        const hayElPerro = await Dog.findOne({ where: { id:Id }});
        if(hayElPerro){
            await hayElPerro.destroy();
            const todosLosPerros = await Dog.findAll();
            res.status(200).json({message:"Se elimino el perro exitosamente"});
        }else{
            res.status(400).json({message:"No hay el perro que intentas eliminar"});
        }
    }catch(error){
        res.status(500).send({message:error.message});
    }
    
}

module.exports = deleteDog;