import { useState } from 'react';
import styles from './styles.module.css'

const  SearchBar = (props) => {

   const { onSearch } =  props;// Nos traemos la funcion que hace la busqueda 


   const [id, setId] = useState('')
  
   const handleClick = () =>{//(Lo que pasa cuando hacemos click)
      //Mandamos lo que ponen en el buscador a la funcion onSearch
      onSearch(id);
   }

   const handleChange = ({ target }) =>{//(Lo que pasa cuando cambiamos el input)
      setId(target.value);
   }

   return(
      <div className={styles.ContainerNav}>
         <input 
            className={styles.Input} 
            onChange={handleChange}
            type='search'
            placeholder='id..'>
         </input>
         <button  onClick={handleClick} className={styles.Button}>Agregar</button>
      </div>
   )
   
}

export default SearchBar;