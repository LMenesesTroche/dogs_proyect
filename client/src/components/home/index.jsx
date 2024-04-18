import { useSelector } from "react-redux";
import Card from "../Razas";
import styles from "./styles.module.css"


export const Home = (props) => {
  return (
    <div className={styles.container}>
      <h1>Page{props.currentPage}</h1>
      <button  onClick={props.handlePrev}>Prev</button>
      <button onClick={props.handleNext}>next</button>
      
      {props.item? props.item.map((element)=>(
        <Card 
        key={element.id}
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
