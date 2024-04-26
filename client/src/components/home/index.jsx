import React, {useEffect, useState } from 'react';
import Card from "../Card";
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { orderDogsByTemperaments, filterDogsByOrigin, orderByAbc,orderByWeight } from '../../redux/actions';
import perritoPredeterminado from "./perritoPredeterminado.jpg"
//URL de la API
const URL = 'http://localhost:3001/dogs';
const itemsPorPagina = 8;


export const Home =  ({ getDogs, getTemperaments }) => {
  const dispatch = useDispatch();

  //Traemos a las razas de mi reducer
  const misRazas = useSelector(state => state.misRazas );
  const misTemperamentos = useSelector(state => state.misTemperamentos );  
    //Usar useEffect para evitar llamados infinitos
    useEffect(()=>{
        getTemperaments();
    },[])

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
  const handleOrderTemperaments = (e)=>{
    setCurrentPage(0);
    dispatch(orderDogsByTemperaments(e.target.value))
 }
 const handleOrigin = (e) => {
  setCurrentPage(0);
  dispatch(filterDogsByOrigin(e.target.value))
 }

//Info del ordenamiento
const [orderData, setOrderData] = useState({
  typeOfOrder: '',
  acdc: '',
});

const handleChange1 = (e) => {
  const { value } = e.target;
  setOrderData(prevState => ({
    ...prevState,
    typeOfOrder: value
  }));
  dispatch(orderByAbc(value))
};
const handleChange2 = (e) => {
  const { value } = e.target;
  setOrderData(prevState => ({
    ...prevState,
    typeOfOrder: value
  }));
  dispatch(orderByWeight(value))
};





  return (
    
    <div className={styles.container}>
      <div>
        <select onChange={handleOrderTemperaments} name='temperament'>
          {misTemperamentos? misTemperamentos.map((element,index)=>(
              <option key={index} value={element}>{element}</option>
          )):null}       
          <option key={1000}  value={"all"}>All</option> 
          </select> 
      </div>  
      <div>
        <select onChange={handleOrigin} name='origin'>
          <option value={"api"}>API</option>
          <option value={"dataBase"}>Data Base</option>
          <option value={"all"}>All</option>
        </select>
      </div>

      <div>
        <label>Alphabetical order</label>
          <select onChange={handleChange1} name='typeOfOrder'>
            <option value={"asc"}>Asc</option>
            <option value={"dsc"}>Dsc</option>
          </select>
      </div>
      <div>
        <label>Weight order</label>
        <select onChange={handleChange2} name='weightOrder'>
          <option value={"asc"}>Asc</option>
          <option  value={"dsc"}> Dsc</option>
        </select>
      </div>
      
      <h1>Page{currentPage}</h1>
      <button  onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>next</button>
      
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
  );
};

export default Home;
