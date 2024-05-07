import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import perritoPredeterminado from "./perritoPredeterminado.jpg"
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';

const URL = 'http://localhost:3001/dogs';
const  imagenURL = "https://api.thedogapi.com/v1/images/"

export default function Detail({ deleteDog }){
    const dispatch = useDispatch();

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

     let nuevo = ''
     if(Array.isArray(dog.temperament)){
         nuevo = dog.temperament.join(', ')
     }else{
         nuevo = dog.temperament
     }
    const handleDelete = () => {
        deleteDog(id);
     }
    return(
        <div className={styles.container}>
            <div className={styles.infoEImagen}>
                <div className={styles.detailSection}>
                    <h2 className={styles.h2}>Name| {dog.name}</h2>
                    <h2  className={styles.h2}>Weight| {dog.weight && dog.weight.metric ? `${dog.weight.metric} kg`  : dog.weight ? `${dog.weight} kg` : "Unknown"}</h2>
                    <h2  className={styles.h2}>Height| {dog.height && dog.height.metric ? `${dog.height.metric} cm`  : dog.height ? `${dog.height} cm` : "Unknown"}</h2>
                    <h2 className={styles.h2}>Temperament| {nuevo}</h2>
                    <h2 className={styles.h2}>Life Span| {dog.life_span ? `${dog.life_span}` : "Unknown"}</h2> 
                </div>
                <div className={styles.imageSection}>
                    <img src={dog.image?dog.image:perritoPredeterminado} className={styles.image} alt="Imagen del perro" />           
                </div>
            </div>
            <div className={styles.boton}>
                <Link to={`/home`}>
                    {dog.fromDataBase && <button onClick={handleDelete}className={styles.buttonDelete}>DELETE DOG</button> }

                    <button className={styles.Button}>Go back</button>

                </Link>
            </div>
        </div>

    )
    }