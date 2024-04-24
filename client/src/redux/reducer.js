import { ADD_RAZA, ADD_TEMPERAMENT, DELETE_ALL, ORDER_TEMPERAMENTS } from "./actions";

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
                //Convertir mis razas a un filtrado de mis razas originales
                misRazas:  payload !== 'todos' ? state.razasOriginales.filter((element)=>element.temperament &&  element.temperament.includes(payload))  : state.razasOriginales
            }    
        default:
            return{...state};
    }
}
export default rootReducer;
