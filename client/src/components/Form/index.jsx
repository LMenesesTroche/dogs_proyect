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
        life_span: '',
        temperament: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        height: 0,

    });
    //Lo que pasa despues de  oprimir submit
    const handlerSubmit = (event) =>{
        event.preventDefault();
        console.log(dogData)
        // postDog(userData);
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
            <form className={styles.form}>

                <label>Name</label>
                <input 
                type='text' 
                name='name'
                value={dogData.name}
                onChange={handleChange}
                //Si hay un error en name entonces el estilo es warning si no el estilo es input form
                className={`${errors.name ? style.warning: ''} ${style.inputForm}`}
                />
                {errors.name && <span className={style.warning}>{errors.name}</span>}

                <label>Height</label>
                <input 
                type='number' 
                name='height'
                value={dogData.height}
                onChange={handleChange}
                />
                {errors.height && <span className={style.warning}>{errors.height}</span>}


                <label>Weight</label>
                <input 
                type='text' 
                name='weight'
                value={dogData.weight}
                onChange={handleChange}

                />
                <label>Life Span</label>
                <input 
                type='text' 
                name='life_span'
                value={dogData.life_span}
                onChange={handleChange}

                />
               

                <button type='submit' >Submit</button>
            </form>
        </div>

    )
    }