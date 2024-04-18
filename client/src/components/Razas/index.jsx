import styles from './styles.module.css';

export default function Card({ imagen, nombre, peso, temperamento }) {

   return (
      <div className={styles.container}>
        <img className={styles.img} src={imagen}></img>
        <h2 >{nombre}</h2>
        <h2 >{peso}</h2>
        <h2 >{temperamento}</h2>
      </div>
   );
}
