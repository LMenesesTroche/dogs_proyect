import { ADD_RAZA, ADD_TEMPERAMENT, DELETE_ALL, ORDER_TEMPERAMENTS, FILTER_BY_ORIGIN, ORDER_BY_ABC, SET_CURRENT_PAGE, DELETE_DOG } from "./actions";

const initialState = {
    misRazas:[],
    razasOriginales: [], // Almacenar las razas originales
    misTemperamentos:[],
    myCurrentPage:0,
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
                ...state,
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
            return{
                ...state,
                misRazas: payload === 'api' //Si el payload es api 
                ? state.razasOriginales.filter(element => !element.fromDataBase)//Quitamos los que tengan from database en true
                : payload === 'dataBase'//Si es from database
                ? state.razasOriginales.filter(element => element.fromDataBase) // quitamos los que tengan from database en false
                : state.razasOriginales // Si payload es 'all', devolver todas las razasOriginales sin filtrar

            } 
            //todo revisar
            case ORDER_BY_ABC:
                const sortedArr = payload === 'asc' ?
                [...state.misRazas].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) : payload === 'dsc' ?
                [...state.misRazas].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                }) : state.razasOriginales
            return {
                ...state,
                misRazas: sortedArr
            }

            case 'ORDER_BY_WEIGHT':
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
                const sortedWeight = payload === 'asc' ?
                    [...state.misRazas].sort((a, b) => {
                        const weightA = pesoPromedio(a.weight);
                        const weightB = pesoPromedio(b.weight);
                        return weightA - weightB;
                      })
                    :  payload === 'dsc' ?
                    [...state.misRazas].sort((a, b) => {
                        const weightA = pesoPromedio(a.weight);
                        const weightB = pesoPromedio(b.weight);
                        return weightB - weightA;
                    }): state.razasOriginales
                
                return {
                    ...state,
                    misRazas: sortedWeight
                }

            case SET_CURRENT_PAGE:
                console.log(payload)
                return{
                    ...state,
                    myCurrentPage:payload
                } 
            case DELETE_DOG:
                return{
                    ...state,
                    //Convertir "misRazas" a un filtrado de mis razas originales
                    razasOriginales:  state.razasOriginales.filter((perro)=>perro.id !== payload),
                    misRazas:  state.razasOriginales.filter((perro)=>perro.id !== payload)

                } 
       
            
        default:
            return{...state};
    }
}
export default rootReducer;
