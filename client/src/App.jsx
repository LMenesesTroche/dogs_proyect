import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { Route, Routes, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRaza } from './redux/actions';
import Nav from './components/Nav';
import Home from './components/home';
import axios from 'axios'
import './App.css'
import Listado from './components/Listado';
import { useSelector } from "react-redux";

const URL = 'http://localhost:3001/dogs';


const DATOS_API = Array.from({ length:  60},(value,index)=>{
  return {id:index, nombre:`Item#${index}`}
})

const itemsPorPagina = 8;

//Nombre falso = AffenpinScher
function App() {
  const dispatch = useDispatch();

  //Items son los datos recortados que se mostraran en la pantalla
  const [items, setItems] = useState([...DATOS_API].splice(0, itemsPorPagina));
  //Esta es la pagina actual en la que estamos
  const [currentPage, setCurrentPage ] = useState(0)

  const handleNext = () =>{
    const totalDeElementos = DATOS_API.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemsPorPagina;
    if( firstIndex >= totalDeElementos ) return;
    setItems([...DATOS_API].splice(firstIndex, itemsPorPagina))
    setCurrentPage(nextPage);
  }

  const handlePrev = () =>{
    const prevPage = currentPage -1;
    if(prevPage < 0) return;
    const firstIndex  = prevPage * itemsPorPagina;
    setItems([...DATOS_API].splice(firstIndex, itemsPorPagina))
    setCurrentPage(prevPage);
  }

  const getDogs = async () => {
    try{
      let response = await  axios(URL);
      response.data.forEach( async element => {
        if(element){ //mando un objeto a la vez;
          dispatch(addRaza(element));
        }
      });
     
    }catch(error){
      console.log(error.message);
    }
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

  return (
    <div className='App'>
          { 
            location.pathname !== '/' ?
            <Nav onSearch={onSearch}  /> :
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

        <Route path='/listado' element={
          <Listado />
        } />

      </Routes>
    </div>
  )
}

export default App
