import {Link} from 'react-router-dom'
import styles from './styles.module.css'
import image from './perrito.jpg';

export const Login = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.containerPequeño}>
        <div className={styles.image}>
              <img src={image} alt="Imagen de perrito"/>
        </div>
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