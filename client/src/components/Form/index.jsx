import React, {useEffect, useState } from 'react';
import styles from './styles.module.css' 
import validation from './validations';  
import style from './styles.module.css';
import { useSelector } from "react-redux";

const URL = 'http://localhost:3001/dogs';

export default function Form({ postDog, getTemperaments}){

    const misTemperamentos = useSelector(state => state.misTemperamentos );
    
    //Usar useEffect para evitar llamados infinitos
    useEffect(()=>{
        getTemperaments();
    },[])
    // console.log(misTemperamentos)
    
    const [dogData, setUserData] = useState({
        name: '',
        height: '',
        weight: '',
        years: '',
        breed_group: '',
        temperament:[],
    });

    const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: '',
        years: '',
        breed_group:'',
        temperament:[],
    });
    //Lo que pasa despues de  oprimir submit
    const handlerSubmit = (event) =>{
        event.preventDefault();
        
        if(errors.name||errors.height||errors.weight||errors.years||errors.temperament||errors.breed_group){
            alert("Form has errors")
        }else{
            postDog(dogData);
            setUserData(prevState => ({
                name: '',
                height: '',
                weight: '',
                years: '',
                breed_group: '',
                temperament:[],
            }));
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

        setErrors(validation({
          ...dogData,
          [name]: value
        }));
    };


    
    return(
        <div className={styles.container} onSubmit={handlerSubmit}>
            <h1>Create your dog!</h1>
            <label> (*) Means it cannot be empty</label>

            <form className={styles.form} id="formul">
                <div className={styles.arriba}>
                    <div className={styles.primero}>    
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

                        <label>Years old</label>
                        {errors.years && <span className={style.warning}>{errors.years}</span>}
                        <input 
                        type='text' 
                        name='years'
                        value={dogData.years}
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
                        {errors.temperament && <span className={style.warning}>{errors.temperament}</span>}
                        <select multiple onChange={handleChange} name='temperament' className={styles.seleccionMultiple}>
                            {misTemperamentos? misTemperamentos.map((element,index)=>(
                                <option key={index} value={element}>{element}</option>
                            )):null}        
                        </select>    
                    </div>       
                </div>
                <div className={styles.abajo}>
                    <button className={styles.button}type='submit'>Submit</button>
                </div>
            </form>
        </div>

    )
    }