import axios from 'axios';
export const ADD_RAZA = 'ADD_RAZA';


export function addRaza(raza){
    return{
        type: ADD_RAZA,
        payload:raza
    }
}
