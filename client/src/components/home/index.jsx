import { useSelector } from "react-redux";
import Card from "../Razas";
import styles from "./styles.module.css"


export const Home = () => {
  const razas = useSelector(initialState => initialState.misRazas);
  console.log(razas);
  return (
    <div className={styles.container}>
      
      {razas? razas.map((element)=>(
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
