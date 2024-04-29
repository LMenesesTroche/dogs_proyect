const objeto = [
  {peso:"10 - 11"},
  {peso:"11 - 12"},
  {peso:"12 -  13"},
]

const aNumeros = objeto.forEach((elemento)=>{
  let sinLineas = elemento.peso.split("-")  
  let numeros = sinLineas.map((elemento)=>{
  let arrDeNumeros =  parseInt(elemento)
  })
  
})

const arr = [2,2];
const promedio = arr[1] + arr[0] ;
console.log(promedio/2)