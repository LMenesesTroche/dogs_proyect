import { useSelector } from "react-redux";
import Card from "../Razas";
import styles from "./styles.module.css"


export const Home = (props) => {
  

  // const items = props.item.map((item,index)=>{
  //   return <li key={item.id}> {item.nombre}</li>
  // })

  return (
    <div className={styles.container}>
      <h1>Pagina{props.currentPage}</h1>
      <button  onClick={props.handlePrev}>Prev</button>
      <button onClick={props.handleNext}>next</button>
      {/* <ul>
        {items}
      </ul> */}
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
