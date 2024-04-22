import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { Route, Routes, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRaza, addTemperament } from './redux/actions';
import Nav from './components/Nav';
import Home from './components/home';
import Detail from './components/Detail';
import axios from 'axios'
import './App.css'
import { useSelector } from "react-redux";
import Form from './components/Form';

const URL = 'http://localhost:3001/dogs';

// const DATOS_API = Array.from({ length:  60},(value,index)=>{
//   return {id:index, nombre:`Item#${index}`}
// })
const itemsPorPagina = 8;

//Nombre falso = AffenpinScher
function App() {
  const dispatch = useDispatch();
  
  const misRazas = useSelector(state => state.misRazas );

  //Items son los datos recortados que se mostraran en la pantalla
  const [items, setItems] = useState([...misRazas].splice(0, itemsPorPagina));
  //Esta es la pagina actual en la que estamos
  const [currentPage, setCurrentPage ] = useState(0)

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

  

  const onSearch = async (id) => {
    try{
      let response = await  axios(URL + `/raza/${id}`);
      response.data.forEach( async element => {
        if(element){ //mando un objeto a la vez;
          dispatch(addRaza(element));
        }
      });
    }catch(error){
      console.log(error.message);
    }
  }

  const getDogs = async () => {
    const  imagenURL = "https://api.thedogapi.com/v1/images"
    let response = await  axios(URL);
    try{
      response.data.forEach( async element => {
        if(element){ //mando un objeto a la vez;
          let imagenReal = await  axios(imagenURL +`/${element.imagen}`);
          element.imagen = imagenReal.data.url;
          dispatch(addRaza(element));
        }
      });
    }catch(error){ 
      console.log(error.message);
    }
  }

  const postDog = async ({ dogData }) => {
    console.log(dogData)
    // axios.post(URL,{
    //   props
    // })
  }
  const getTemperaments = async () => {
    try{
      let response = await  axios(URL + `/temperaments`);
      response.data.forEach( element => {
          dispatch(addTemperament(element.name));
      });
    }catch(error){
      console.log(error.message);
    }
  }
  

  return (
    <div className='App'>
          { 
            location.pathname !== '/' ?
            <Nav onSearch={onSearch} getDogs={getDogs} /> :
            undefined
          }
      <Routes>

        {/* LOGIN */}
        <Route path='/' element={
          <Login getDogs={getDogs}/>
        } />

        {/* Home */}
        <Route path='/home' element={
          <Home  item={items} handlePrev={handlePrev} handleNext={handleNext} currentPage={currentPage}/>
        } />

        <Route path='/detail/:id' element={
          <Detail/>
        } />
        
        <Route path='/form/' element={
          <Form postDog={postDog} getTemperaments={getTemperaments}/>
        } />
        

      </Routes>
    </div>
  )
}

export default App
