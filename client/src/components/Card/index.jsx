import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export default function Card({ id ,image, name, weight, temperament, breed_group }) {
   return (
      <div className={styles.container}>
        <img className={styles.img} src={image}></img>
        <Link to={`/detail/${id}`}>
            <h2 >{name}</h2>
         </Link>
        <h2 >{weight}</h2>
        <h2 >{breed_group}</h2>
        <h2 >{temperament}</h2>
      </div>
   );
}
