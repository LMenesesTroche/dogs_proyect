import {Link} from 'react-router-dom'
import styles from './styles.module.css'
import image from './perrito.jpg';

export const Login = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.containerPequeño}>

        <img src={image} className={styles.imagen}alt="Imagen de perrito"/>
        <div className={styles.containerOfbutton}>
          <Link to="/home">
              <button className={styles.button} >Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;