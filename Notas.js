// Array de objetos con pesos en formato de cadena
const dogs = [
    { name: 'Labrador Retriever', weight: '100-200' },
    { name: 'Bulldog', weight: '20-20' },
    { name: 'German Shepherd', weight: '30-30' },
    // Otros objetos
  ];
  
  // Función para convertir la cadena de peso en un número entero
  const parseWeight = (weightString) => {
    // Usar expresión regular para encontrar el número en la cadena de peso
    const regex = /(\d+)/;
    const match = weightString.match(regex);
    if (match) {
      return parseInt(match[0]); // Convertir el número encontrado a un entero
    }
    return 0; // En caso de que no se encuentre ningún número, devolver 0
  };
  
  // Función de comparación para ordenar por peso
  dogs.sort((a, b) => {
    const weightA = parseWeight(a.weight);
    const weightB = parseWeight(b.weight);
    return weightA - weightB;
  });
  
  console.log(dogs);
  //Todo ------------------------------------------------------------------------------------------------------

  case 'ORDER_BY_WEIGHT':
                console.log("llega a weitght")
                console.log(state.razasOriginales)
                const parseWeight = (weightString) => {
                        // Usar expresión regular para encontrar el número en la cadena de peso
                        const regex = /(\d+)/;
                        const match = weightString.match(regex);
                        if (match) {
                          return parseInt(match[0]); // Convertir el número encontrado a un entero
                        }
                        return 0; // En caso de que no se encuentre ningún número, devolver 0
                    
                  };
                const sortedWeight = payload === 'asc' ?
                    ...state.razasOriginales.sort((a, b) => {
                        const weightA = parseWeight(a.weight);
                        const weightB = parseWeight(b.weight);
                        return weightA - weightB;
                      }):
                    ...state.razasOriginales.sort((a, b) => {
                        const weightA = parseWeight(a.weight);
                        const weightB = parseWeight(b.weight);
                        return weightB - weightA;
                      })
                return {
                    ...state,
                    misRazas: sortedWeight
                }