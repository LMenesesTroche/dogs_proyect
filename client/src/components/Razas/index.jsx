import styles from './styles.module.css';

export default function Card({ raza }) {

   return (
      <div className={styles.container}>
        <h2 >{raza}</h2>
      </div>
   );
}
