import React, {useEffect, useState } from 'react';
import Card from "../Card";
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

const URL = 'http://localhost:3001/dogs';
const itemsPorPagina = 8;


export const Home =  ({ getDogs }) => {
  //Traemos a las razas de mi reducer
  const misRazas = useSelector(state => state.misRazas );
  //Items son los datos recortados que se mostraran en la pantalla
  const [items, setItems] = useState([...misRazas].splice(0, itemsPorPagina));
  //Esta es la pagina actual en la que estamos
  const [currentPage, setCurrentPage ] = useState(0)

  //Traemos los perros al front
  useEffect(()=>{
    getDogs();
  },[])

    // Actualizamos los items cuando misRazas cambien
    useEffect(() => {
    setItems([...misRazas].splice(currentPage * itemsPorPagina, itemsPorPagina));
  },[misRazas, currentPage]);
  
  
  const handleNext = () =>{
    const totalDeElementos = misRazas.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemsPorPagina;
    if( firstIndex >= totalDeElementos ) return;
    setItems([...misRazas].splice(firstIndex, itemsPorPagina))
    setCurrentPage(nextPage);
  }

  const handlePrev = () =>{
    const prevPage = currentPage -1;
    if(prevPage < 0) return;
    const firstIndex  = prevPage * itemsPorPagina;
    setItems([...misRazas].splice(firstIndex, itemsPorPagina))
    setCurrentPage(prevPage);
  }
  return (
    
    <div className={styles.container}>
      <h1>Page{currentPage}</h1>
      <button  onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>next</button>
      
      {items? items.map((element)=>(
        <Card 
        key={element.id}
        id={element.id}
        image={element.image}
        name={element.name}
        weight={element.weight}
        temperament={element.temperament}

        />
      )):null}
    </div>
  );
};

export default Home;
