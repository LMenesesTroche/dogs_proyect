import { useSelector } from "react-redux";
import Card from "../Card";
import styles from "./styles.module.css"
const URL = 'http://localhost:3001/dogs';

export const Home =  (props) => {
  
  return (
    
    <div className={styles.container}>
      hola
      <h1>Page{props.currentPage}</h1>
      <button  onClick={props.handlePrev}>Prev</button>
      <button onClick={props.handleNext}>next</button>
      
      {props.item? props.item.map((element)=>(
        <Card 
        key={element.id}
        id={element.id}
        imagen={element.imagen}
        nombre={element.nombre}
        peso={element.peso}
        temperamento={element.temperamento}

        />
      )):null}
    </div>
  );
};

export default Home;
