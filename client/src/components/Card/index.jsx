import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function Card({ id ,imagen, nombre, peso, temperamento }) {
   return (
      <div className={styles.container}>
        <img className={styles.img} src={imagen}></img>
        <Link to={`/detail/${id}`}>
            <h2 >{nombre}</h2>
         </Link>
        <h2 >{peso}</h2>
        <h2 >{temperamento}</h2>
      </div>
   );
}
