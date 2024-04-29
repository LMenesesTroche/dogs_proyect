const pesoPromedio = (weightString) => {
  if(weightString !== undefined){
    if(typeof weightString === 'string'){
      let weightArray = weightString.split("-");
      let weight = weightArray.map((element) => {
        return Number (element.trim())
      });
      if(weight.length === 2){
        let suma =  weight[0] + weight[1];
        let promedio = suma / 2;
        return promedio
      }else{
        return weight;
      }
    }else{
      return weightString
    }
  }else{
    console.log("Error en peso promedio")
  }
};

const weightA = pesoPromedio('90-20');
console.log(weightA)
