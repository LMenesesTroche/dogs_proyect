import React, {useEffect, useState } from 'react';
import styles from './styles.module.css' 
import validation from './validations';  
import style from './styles.module.css';
import { useSelector } from "react-redux";
import { setSignal } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

const URL = 'http://localhost:3001/dogs';

export default function Form({ postDog, getTemperaments}){
    const dispatch = useDispatch();

    const misTemperamentos = useSelector(state => state.misTemperamentos );
    const signal = useSelector(state => state.myCurrentPage );  

    useEffect(()=>{
        getTemperaments();
    },[])
    
    const [dogData, setUserData] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        breed_group: '',
        temperament:[],
    });

    const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        breed_group:'',
        temperament:[],
    });
    
    //Esperamos la signal y si llega borramos lo que hay en el form
    if(signal === 1){  
        setUserData(prevState => ({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            breed_group: '',
            temperament:[],
        }));
        dispatch(setSignal(0))
    }
    //Lo que pasa despues de  oprimir submit
    const handlerSubmit = (event) =>{
        event.preventDefault();
        if(dogData.temperament.length > 5){
            alert("Too many selected temperaments")
        }else{
            if(errors.name||errors.height||errors.weight||errors.life_span||errors.temperament||errors.breed_group){
                alert("Form has errors")
            }else{
                postDog(dogData);
            }
        }
    }
    //Esto esta pasando mientras se va escribiendo en el form
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'temperament'){
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setUserData(prevState => ({
                ...prevState,
                [name]:selectedOptions
            }));
        }else{
            setUserData(prevState => ({
                ...prevState,
                [name]:value
            }));
        }
        //Mandamos los datos a validacion
        setErrors(validation({
          ...dogData,
          [name]: value
        }));
    };


    
    return(
        <div className={styles.container} onSubmit={handlerSubmit}>
            <h1>Create your dog!</h1>

            <form className={styles.form} id="formul">
                <div className={styles.arriba}>
                    <div className={styles.primero}> 
                        <label className={styles.aclaracionesAterisco}> (*) Means it cannot be empty</label>
                        <p></p>
                        <label>Name</label>
                        {errors.name && <span className={style.warning}>{errors.name}</span>}
                        <input 
                        type='text' 
                        name='name'
                        value={dogData.name}
                        onChange={handleChange}
                        //Si hay un error en name entonces el estilo es warning si no el estilo es input form
                        className={`${errors.name ? style.warning: ''} ${style.inputForm}`}
                        />

                        <label>Height (cm)</label>
                        {errors.height && <span className={style.warning}>{errors.height}</span>}
                        <input 
                        type='text' 
                        name='height'
                        value={dogData.height}
                        onChange={handleChange}
                        />


                        <label>Weight (Kg)</label>
                        {errors.weight && <span className={style.warning}>{errors.weight}</span>}
                        <input 
                        type='text' 
                        name='weight'
                        value={dogData.weight}
                        onChange={handleChange}
                        />

                        <label>Life_span</label>
                        {errors.life_span && <span className={style.warning}>{errors.life_span}</span>}
                        <input 
                        type='text' 
                        name='life_span'
                        value={dogData.life_span}
                        onChange={handleChange}
                        />

                        <label>Breed Group</label>
                        {errors.breed_group && <span className={style.warning}>{errors.breed_group}</span>}
                        <input 
                        type='text' 
                        name='breed_group'
                        value={dogData.breed_group}
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.segundo}>
                        <label>Temperament</label>
                        <label className={styles.aclaraciones}>Press control to select multiple options</label>
                        {errors.temperament && <span className={style.warning}>{errors.temperament}</span>}
                        <select multiple onChange={handleChange} name='temperament' className={styles.seleccionMultiple}>
                            {misTemperamentos? misTemperamentos.map((element,index)=>(
                                <option key={index} value={element}>{element}</option>
                            )):null}        
                        </select>    
                    </div>       
                </div>
                <div className={styles.ultimaSeccion}>
                    <Link to={`/home`}>
                        <button className={styles.button}>Cancel</button>
                    </Link>
                    <div className={styles.abajo}>
                        <button className={styles.button}type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </div>

    )
    }