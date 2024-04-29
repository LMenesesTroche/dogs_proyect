const pesoPromedio = (weightString) => {
  if(typeof weightString === 'string'){
    let weightArray = weightString.split("-");
    let weight = weightArray.map((element) => {
      return element.trim()
    });
    if(weight.length === 2){
      let suma = Number (weight[0]) + Number(weight[1]);
      let promedio = suma / 2;
      return promedio
    }else{
      return weight;
    }
  }
};

const weightA = parseWeight("2 - 10");
console.log(weightA)
