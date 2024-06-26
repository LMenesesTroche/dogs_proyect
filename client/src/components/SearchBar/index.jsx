import { useState } from 'react';
import styles from './styles.module.css'
import {Link} from 'react-router-dom'

const  SearchBar = (props) => {
   const { onSearch, getDogs } = props
   const [id, setId] = useState('')
   
   const handleClick = () =>{
      onSearch(id);
   }

   const handleChange = ({ target }) =>{
      setId(target.value);
   }
   const handleClickClear = () =>{
      getDogs()
   }

   return(
      <div className={styles.ContainerNav}>
         <input 
            className={styles.Input} 
            onChange={handleChange}
            type='search'
            placeholder='Search breed'>
         </input>
         <Link to={`/home`}>
            <button  onClick={handleClick} className={styles.Button}>Search</button>
         </Link>
         <Link to={`/home`}>
            <button  onClick={handleClickClear} className={styles.Button}>Clear</button>
         </Link>
      </div>
   )
   
}

export default SearchBar;