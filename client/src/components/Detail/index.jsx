import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import perritoPredeterminado from "./perritoPredeterminado.jpg"

const URL = 'http://localhost:3001/dogs';
const  imagenURL = "https://api.thedogapi.com/v1/images/"

export default function Detail(){
    
    const { id } = useParams();
    const [dog, setDog] = useState({});
    
    useEffect(() => {
        axios(URL + `/id/${id}`).then(({ data }) => {
            if (data.name) {
                axios(imagenURL+`${data.reference_image_id}`).then(response => {
                    setDog({ ...data, image: response.data.url }); 
                })
                setDog(data);
           } else {
              window.alert('No hay perros');
           }
        });
        return setDog({});
     }, [id]);
    return(
        <div className='containerOfDetails'>
            <div  >
                <h2>Name|{dog.name}</h2>
                <h2>Height| {dog.height ? dog.height.metric : 'Unknown'}</h2>
                <h2>Weight| {dog.weight ? dog.weight.metric : 'Unknown'}</h2>
                <h2>temperament| {dog.temperament}</h2>
                <h2>Life Span| {dog.life_span}</h2>

                
            </div>
           <div className='image'>
               <img src={dog.image?dog.image:perritoPredeterminado} alt="Imagen del perro" height={150} width={150}/>           
           </div>
        </div>

    )
    }