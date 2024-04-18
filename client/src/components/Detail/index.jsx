import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const URL = 'http://localhost:3001/dogs';
const  imagenURL = "https://api.thedogapi.com/v1/images/"

export default function Detail(){
    
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    
    useEffect(() => {
        axios(URL + `/id/${id}`).then(({ data }) => {
            if (data.name) {
                axios(imagenURL+`${data.reference_image_id}`).then(response => {
                    setCharacter({ ...data, image: response.data.url }); 
                })
                setCharacter(data);
           } else {
              window.alert('No hay perros');
           }
        });
        return setCharacter({});
     }, [id]);

    return(
        <div className='containerOfDetails'>
            <div  >
                <h2>Name|{character.name}</h2>
                <h2>breed_group| {character.breed_group}</h2>
                <h2>temperament| {character.temperament}</h2>
                <h2>origin| {character.origin}</h2>
                
            </div>
           <div className='image'>
               <img src={character.image} alt="Imagen del perro" height={150} width={150}/>           
           </div>
        </div>

    )
    }