const  arr = [
    {   
        name:"Huesos",
        raza:"Doberman",
        comportamiento:"feroz", 
    },{
        name:"Huesos",
        raza:"Rodwidler",
        comportamiento:"alocado"
    }
]
const name = "Huesos";

//__________________________________________________________________________________________________

const razas  = [];


arr.forEach((x)   =>{
    if(name === x.name){
        razas.push(x.raza)
    }
}
);

console.log(razas)