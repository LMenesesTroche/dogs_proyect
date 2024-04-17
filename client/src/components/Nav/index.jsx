import React from "react";
import SearchBar from "../SearchBar/index";
import {Link} from 'react-router-dom'
import styles from './styles.module.css'
const Nav = ({onSearch}) => {
  
  return (
    <>
        <div className={styles.container}>
          <div className={styles.containerOfSearchBar}>
            <SearchBar onSearch={onSearch} />
          </div>
          <Link to="/listado">
            <button>Listado</button>
          </Link>
        </div>
    </>
  );
};

export default Nav;