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
         <Link to={`/detail/${id}`}>
            <div className={styles.contendorImagen}>
               <img className={styles.img} src={image}></img>
            </div>
            <div className={styles.contendorDetail}>
               <div className={styles.contenedorIzquierdo}>
                  <h2 className={styles.textoIndicativo}>Name</h2>
                  <h2 className={styles.textoIndicativo}>Weight</h2>
                  <h2 className={styles.textoIndicativo}>Breed group</h2>
                  <h2 className={styles.textoIndicativo}>Temperament</h2>
               </div>
               <div className={styles.contenedorCentralDeLineas}>
                  <h2 className={styles.lineas}>|</h2>
                  <h2 className={styles.lineas}>|</h2>
                  <h2 className={styles.lineas}>|</h2>
                  <h2 className={styles.lineas}>|</h2>
               </div>
               <div className={styles.contenedorDerecho}>
                  <div className={styles.contenedorDeTextoQueNoEsTemperaments}>
                     <h2 className={styles.name} >{name ? name : 'Unknown'}</h2>
                     <h2 className={styles.weight}>{weight ? weight : 'Unknown'}</h2>
                     <h2 className={styles.breed_group}>{breed_group ? breed_group : 'Unknown'}</h2>
                  </div>
                  <div className={styles.contenedorDeTemperamentos}>
                     <h2 className={styles.temperamentos}>{nuevo}</h2>    
                  </div>
               </div>
            </div>
         </Link>

      </div>
   );
}
