import { useState } from 'react';
import styles from './styles.module.css'
// import { useDispatch } from 'react-redux';
// import { setCurrentpage } from '../../redux/actions';

const  SearchBar = ({ onSearch, setCurrentPage}) => {
   // const dispatch = useDispatch();
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
            placeholder='Search breed'>
         </input>
         <button  onClick={handleClick} className={styles.Button}>Search</button>
      </div>
   )
   
}

export default SearchBar;