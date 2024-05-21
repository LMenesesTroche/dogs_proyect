import React from "react";
import SearchBar from "../SearchBar/index";
import {Link} from 'react-router-dom'
import styles from './styles.module.css'
import image from './logoPatitas.jpg'
const Nav = ({  onSearch, getDogs }) => {
  return (
    <>
        <div className={styles.container}>
          <Link to={`/home`}>
          <img src={image} className={styles.imagen} alt="Imagen de perrito"/>
          </Link>
          <Link to={`/home`}>
              <button className={styles.button}>Home</button>
          </Link>
          <Link to={`/form`}>
              <button className={styles.button}>Form</button>
          </Link>
          <Link to={`/`}>
              <button className={styles.buttonOut}>LogOut</button>
          </Link>
          <Link to={`/upload`}>
            <button className={styles.buttonOut}>Upload</button>
          </Link>
            <SearchBar onSearch={onSearch} getDogs={getDogs} />
        </div>
    </>
  );
};

export default Nav;