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
            // Filtrar las razas originales en lugar de misRazas
            const objClon = structuredClone(state.razasOriginales);
            
            const quitadorDeComasYEspacios = objClon.forEach((element)=>{
                if (element.temperament) { // Verifica si temperament está definido
                    const elementSinComa =  element.temperament.split(',');                        
                    const  arrAux = [];
                    const sinEspacios = elementSinComa.forEach((element)=>{
                        arrAux.push(element.trim(' '));
                    })
                    element.temperament = arrAux.join(', '); // Une los elementos del array con comas y un espacio
                }
            })

            return{
                ...state,
                misRazas:  payload !== 'todos' ? objClon.filter((element)=>element.temperament &&  element.temperament.includes(payload))  : state.razasOriginales
            }    
        default:
            return{...state};
    }
}
export default rootReducer;
