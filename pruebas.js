let obj = [{temperament: 'loco, agresivo '},{temperament: 'docil, tranquilo'}]
    
const quitadorDeComasYEspacios = obj.forEach((element)=>{
    const elementSinComa =  element.temperament.split(',');
    const  arrAux = [];
    const sinEspacios = elementSinComa.forEach((element)=>{
        arrAux.push(element.trim(' '));
    })
    element.temperament = arrAux;
})

const payload = "loco";

const objetoFiltrado = obj.filter(element => element.temperament.includes(payload)); 


console.log(objetoFiltrado)

