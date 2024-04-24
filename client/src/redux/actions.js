import axios from 'axios';
export const ADD_RAZA = 'ADD_RAZA';
export const ADD_TEMPERAMENT = 'ADD_TEMPERAMENT';
export const DELETE_ALL = 'DELETE_ALL';
export const ORDER_TEMPERAMENTS = 'ORDER_TEMPERAMENTS';
export const ORDER_ORIGIN = 'ORDER_ORIGIN';


export function addRaza(raza){
    return{
        type: ADD_RAZA,
        payload:raza
    }
}
export function addTemperament(temperament){
    return{
        type: ADD_TEMPERAMENT,
        payload:temperament
    }
}
export function deleteAll(){
    return{
        type: DELETE_ALL,
    }
}
export function orderDogsByTemperaments(temperament){
    return{
        type: ORDER_TEMPERAMENTS,
        payload:temperament
    }
}
export function orderDogsByOrigin(origin){
    return{
        type: ORDER_ORIGIN,
        payload:origin
    }
}