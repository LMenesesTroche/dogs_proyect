case ORDER:
                const { typeOfOrder, acdc } = payload;
              
                if (typeOfOrder && acdc) {
                  const parseWeight = (weightString) => {
                    if (typeof weightString === 'string') {
                      const regex = /(\d+)/;
                      const match = weightString.match(regex);
                      if (match) {
                        return parseInt(match[0]);
                      }
                    }
                    return 0;
                  };
              
                  if (typeOfOrder === "alphabeticalOrder" && acdc === "descending") {
                    console.log("alfa y desc");
                  } else if (typeOfOrder === "alphabeticalOrder" && acdc === "ascending") {
                    console.log("alfa y asc");
                  } else if (typeOfOrder === "orderByWeight" && acdc === "ascending") {
                    console.log("peso y asc");
                    return {
                      ...state,
                      misRazas: state.razasOriginales.sort((a, b) => {
                        let weightA = parseWeight(a.weight);
                        let weightB = parseWeight(b.weight);
                        return weightA - weightB;
                      })
                    };
                  } else if (typeOfOrder === "orderByWeight" && acdc === "descending") {
                    console.log("peso y desc");
                    return {
                      ...state,
                      misRazas: state.razasOriginales.sort((a, b) => {
                        let weightA = parseWeight(a.weight);
                        let weightB = parseWeight(b.weight);
                        return weightB - weightA;
                      })
                    };
                  }
                  break; // Agrega un break para salir del switch cuando se complete el ordenamiento
                }