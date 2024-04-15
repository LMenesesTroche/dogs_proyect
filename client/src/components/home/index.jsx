import { useSelector } from "react-redux";
import Card from "../Razas";
import styles from "./styles.module.css"


export const Home = () => {
  const razas = useSelector(initialState => initialState.misRazas);
  return (
    <div className={styles.container}>
      {razas? razas.map((element)=>(
        <Card key={element.id} raza={element} />
      )):null}
    </div>
  );
};

export default Home;
