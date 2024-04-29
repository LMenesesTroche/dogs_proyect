import { ADD_RAZA, ADD_TEMPERAMENT, DELETE_ALL, ORDER_TEMPERAMENTS, FILTER_BY_ORIGIN, ORDER_BY_ABC } from "./actions";

const initialState = {
    misRazas:[],
    razasOriginales: [], // Almacenar las razas originales
    misTemperamentos:[],
}

const rootReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case ADD_RAZA:
            return{
                ...state,
                misRazas:[...state.misRazas,payload],
                razasOriginales: [...state.razasOriginales, payload], // Actualizar las razas originales
            }
        case ADD_TEMPERAMENT:
            return{
                ...state,
                misTemperamentos:[...state.misTemperamentos,payload]
            }
        case DELETE_ALL:
            return{
                misRazas:[],
                razasOriginales: [], // Limpiar las razas originales
            }
        case ORDER_TEMPERAMENTS:
            return{
                ...state,
                //Convertir "misRazas" a un filtrado de mis razas originales
                misRazas:  payload !== 'all' ? state.razasOriginales.filter((element)=>element.temperament &&  element.temperament.includes(payload))  : state.razasOriginales
            }    
        case FILTER_BY_ORIGIN:
            console.log(payload)
            return{
                ...state,
                misRazas: payload === 'api' //Si el payload es api 
                ? state.razasOriginales.filter(element => !element.fromDataBase)//Quitamos los que tengan from database en true
                : payload === 'dataBase'//Si es from database
                ? state.razasOriginales.filter(element => element.fromDataBase) // quitamos los que tengan from database en false
                : state.razasOriginales // Si payload es 'all', devolver todas las razasOriginales sin filtrar

            } 
            //todo REVISAR ESTO URGENTE
            case ORDER_BY_ABC:
                console.log(payload)
                const sortedArr = payload === 'asc' ?
                [...state.razasOriginales].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) :
                [...state.razasOriginales].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                misRazas: sortedArr
            }

            case 'ORDER_BY_WEIGHT':
                const parseWeight = (weightString) => {
                    if(typeof weightString === 'string'){
                        // Usar expresión regular para encontrar el número en la cadena de peso
                        const regex = /(\d+)/;
                        const match = weightString.match(regex);
                        if (match) {
                          return parseInt(match[0]); // Convertir el número encontrado a un entero
                        }
                        return 0; // En caso de que no se encuentre ningún número, devolver 0
                    }
                  };
                const sortedWeight = payload === 'asc' ?
                    [...state.razasOriginales].sort((a, b) => {
                        const weightA = parseWeight(a.weight);
                        const weightB = parseWeight(b.weight);
                        return weightA - weightB;
                      })
                    :
                    [...state.razasOriginales].sort((a, b) => {
                        const weightA = parseWeight(a.weight);
                        const weightB = parseWeight(b.weight);
                        return weightB - weightA;
                      })
                
                return {
                    ...state,
                    misRazas: sortedWeight
                }
              
       
            
        default:
            return{...state};
    }
}
export default rootReducer;
