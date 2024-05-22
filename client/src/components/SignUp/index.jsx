import React, { useState } from 'react';
import validation from './validations.js';  
import styles from "./styles.module.css";
import {Link} from 'react-router-dom'


export const SignUp = ({ createUser }) => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
      });
    
      const [errors, setErrors] = useState({
        username: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
        setErrors(validation({
          ...userData,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        createUser(userData);
      };

  return (
    <div className={styles.container}>
        <div className={styles.containerPequeño}>
        <form onSubmit={handleSubmit}>
          <label>username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className={`${errors.username ? styles.warning : ""} ${
              styles.inputForm
            }`}
          />
          {/* If there is an error on username it is gonna throw an span with the error */}
          {errors.username && (
            <span className={styles.warning}>{errors.username}</span>
          )}

          <label>Password</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className={`${errors.password ? styles.warning : ""} ${
              styles.inputForm
            }`}
          />
          {/* If there is an error on username it is gonna throw an span with the error */}
          {errors.username && ( 
            <span className={styles.warning}>{errors.username}</span>
          )}

           <button type='submit' className={styles.button}>Create User</button> 

           <Link to={`/`}>
            <h4>Sign In</h4>  
          </Link>
        </form>

      </div>
    </div>
  );
};

// export default SignUp;
