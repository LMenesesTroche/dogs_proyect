import { ADD_RAZA, ADD_TEMPERAMENT } from "./actions";

const initialState = {
    misRazas:[],
    misTemperamentos:[],
}

const rootReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case ADD_RAZA:
            return{
                ...state,
                misRazas:[...state.misRazas,payload]
            }
        case ADD_TEMPERAMENT:
            return{
                ...state,
                misTemperamentos:[...state.misTemperamentos,payload]
            }
        default:
            return{...state};
    }
}
export default rootReducer;