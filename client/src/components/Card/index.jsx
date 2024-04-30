import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function Card({ id ,image, name, weight, temperament, breed_group }) {
   let nuevo = ''
   if(Array.isArray(temperament)){
      nuevo = temperament.join(', ')
   }else{
      nuevo = temperament
   }
   return (
      <div className={styles.container}>
        <img className={styles.img} src={image}></img>
        <Link to={`/detail/${id}`}>
            <h2 className={styles.detail} >{name}</h2>
         </Link>
        <h2 className={styles.h2Card}>{weight}</h2>
        <h2 className={styles.h2Card}>{breed_group}</h2>
        <h2 className={styles.h2Card}>{nuevo}</h2>
      </div>
   );
}
