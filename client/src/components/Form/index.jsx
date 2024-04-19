import React, {useEffect, useState } from 'react';
import styles from './styles.module.css' 
import validation from './validations';  
import style from './styles.module.css';

const URL = 'http://localhost:3001/dogs';

export default function Form(){
    const [dogData, setUserData] = useState({
        name: '',
        height: '',
        weight: '',
        years: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        height: '',
        weight: '',
        years: '',
        
    });
    //Lo que pasa despues de  oprimir submit
    const handlerSubmit = (event) =>{
        event.preventDefault();
        if(errors.name||errors.height||errors.weight||errors.years){
            alert("Form has errors")
        }else{
            console.log(dogData)
            // postDog(userData);
            alert("Form submmited succesfully")
        }
    }
    //Esto esta pasando mientras se va escribiendo en el form
    const handleChange = (e) => {
        setUserData({
          ...dogData,
          [e.target.name]: e.target.value
        });

        setErrors(validation({
          ...dogData,
          [e.target.name]: e.target.value
        }));
    };

    return(
        <div className={styles.container} onSubmit={handlerSubmit}>
            <label> (*) Means it cannot be empty</label>

            <form className={styles.form}>

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


                <button type='submit' >Submit</button>
            </form>
        </div>

    )
    }