import React, {useEffect, useState } from 'react';
import Card from "../Card";
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { orderDogsByTemperaments, filterDogsByOrigin, orderByAbc,orderByWeight, setSignal } from '../../redux/actions';
import perritoPredeterminado from "./perritoPredeterminado.jpg"
//URL de la API
const URL = 'http://localhost:3001/dogs';
const itemsPorPagina = 8;


export const Home =  ({ getDogs, getTemperaments }) => {
  const dispatch = useDispatch();
  const misRazas = useSelector(state => state.misRazas );
  const misTemperamentos = useSelector(state => state.misTemperamentos );  
  const signal = useSelector(state => state.myCurrentPage );  
  const [currentPage, setCurrentPage ] = useState(0)
  const [items, setItems] = useState([...misRazas].splice(0, itemsPorPagina));
  
  useEffect(()=>{
    if(misRazas.length === 0){
      getDogs();
    }
  },[])

  useEffect(()=>{
    getTemperaments();
  },[])

  

  useEffect(() => {
    setItems([...misRazas].splice(currentPage * itemsPorPagina, itemsPorPagina));
  },[misRazas, currentPage]);
  
    if (signal === 1) {
        setCurrentPage(0);
        dispatch(setSignal(0));
    }

  const [orderData, setOrderData] = useState({
    typeOfOrder: '',
    acdc: '',
  });
  
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

  const handleOrderTemperaments = (e)=>{
    setCurrentPage(0);
    dispatch(orderDogsByTemperaments(e.target.value))
  }
  
  const handleOrigin = (e) => {  
    setCurrentPage(0);
    dispatch(filterDogsByOrigin(e.target.value))
  }

  const handleOrderABC = (e) => {
    setCurrentPage(0);
    const { value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      typeOfOrder: value
    }));
    dispatch(orderByAbc(value))
  };

  const handleWeightOrder = (e) => {
    setCurrentPage(0);
    const { value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      typeOfOrder: value
    }));
    dispatch(orderByWeight(value))
  };

  return ( 
    <div className={styles.container}>
      <div className={styles.filtrosYOrdenamientos}>
        <div >
          <label>Filter by temperament</label>
          <select onChange={handleOrderTemperaments} name='temperament' className={styles.sleccionMultiple} defaultValue="all">
            {misTemperamentos? misTemperamentos.map((element,index)=>(
                <option key={index} value={element}>{element}</option>
            )):null}       
            <option key={1000}  value={"all"}>All</option> 
            </select> 
        </div>  
        <div>
          <label>Filter by origin</label>
          <select onChange={handleOrigin} name='origin' className={styles.sleccionMultiple} defaultValue="all">
            <option value={"api"}>API</option>
            <option value={"dataBase"}>Data Base</option>
            <option key={1000} value={"all"}>All</option>
          </select>
        </div>

        <div>
          <label>Alphabetical order</label>
            <select onChange={handleOrderABC} name='typeOfOrder' className={styles.sleccionMultiple} defaultValue="None">
              <option value={"asc"}>Asc</option>
              <option value={"dsc"}>Dsc</option>
              <option value={"None"}>None</option>
            </select>
        </div>
        <div>
          <label>Weight order</label>
          <select onChange={handleWeightOrder} name='weightOrder' className={styles.sleccionMultiple} defaultValue="None">
            <option value={"asc"}>Asc</option>
            <option  value={"dsc"}> Dsc</option>
            <option  value={"None"}> None</option>
          </select>
        </div>
      </div>
      
      <div className={styles.cards}>
        
        {items? items.map((element)=>(
          <Card 
          key={element.id}
          id={element.id}
          image={element.image?element.image:perritoPredeterminado}
          name={element.name}
          weight={element.weight}
          temperament={element.temperament}
          breed_group={element.breed_group}
          />
        )):null}
      </div>
      <div className={styles.pages}>
        <button  onClick={handlePrev} className={styles.botonPrev}>{"<"}</button>
        <h1 className={styles.currentPage}>Page{currentPage+1}</h1>
        <button onClick={handleNext}className={styles.botonNext} >{">"}</button>
      </div>
    </div>
  );
};

export default Home;
