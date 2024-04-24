import { ADD_RAZA, ADD_TEMPERAMENT, DELETE_ALL, ORDER_TEMPERAMENTS, ORDER_ORIGIN } from "./actions";

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
        case ORDER_ORIGIN:
            console.log(payload)
            return{
                ...state,
                misRazas: payload === 'api' //Si el payload es api 
                ? state.razasOriginales.filter(element => !element.fromDataBase)//Quitamos los que tengan from database en true
                : payload === 'dataBase'//Si es from database
                ? state.razasOriginales.filter(element => element.fromDataBase) // quitamos los que tengan from database en false
                : state.razasOriginales // Si payload es 'all', devolver todas las razasOriginales sin filtrar

            }   
        default:
            return{...state};
    }
}
export default rootReducer;
