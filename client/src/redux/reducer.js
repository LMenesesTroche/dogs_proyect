import { ADD_RAZA } from "./actions";

const initialState = {
    misRazas:[]
}

const rootReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case ADD_RAZA:
            return{
                ...state,
                misRazas:[...state.misRazas,payload]
            }
        default:
            return{...state};
    }
}
export default rootReducer;