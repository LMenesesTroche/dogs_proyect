
import axios from 'axios'
const URL = 'http://localhost:3001/dogs';
import styles from "./styles.module.css"
import Card from "../Razas";


export const Listado = async() => {
    let response = await  axios(URL);
    
    return (
        <div className={styles.container}>
        
        {response.data? response.data.map((element)=>(
            <Card 
            key={element.id}
            imagen={element.imagen}
            nombre={element.nombre}
            temperamento={element.temperamento}
            peso={element.peso}

            />
        )):null}
        </div>
    );
};

export default Listado;
