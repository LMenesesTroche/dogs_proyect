import React from "react";
import SearchBar from "../SearchBar/index";
import {Link} from 'react-router-dom'
import styles from './styles.module.css'
import image from './logoPatitas.jpg'
const Nav = ({  onSearch }) => {
  return (
    <>
        <div className={styles.container}>
          <img src={image} className={styles.imagen} alt="Imagen de perrito"/>
            <Link to={`/home`}>
              <button className={styles.button}>Home</button>
          </Link>
          <Link to={`/form`}>
              <button className={styles.button}>Form</button>
          </Link>
            <SearchBar onSearch={onSearch} />
        </div>
    </>
  );
};

export default Nav;