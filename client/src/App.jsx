import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import { Route, Routes, useLocation ,useNavigate} from 'react-router-dom';
import { addRaza, addTemperament, deleteAll } from './redux/actions';
import Nav from './components/Nav';
import Home from './components/home';
import Detail from './components/Detail';
import axios from 'axios'
import './App.css'
import { useSelector } from "react-redux";
import Form from './components/Form';
import { useDispatch } from 'react-redux';
const URL = 'http://localhost:3001/dogs';

//Nombre falso = AffenpinScher
function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // Obtener la ubicación actual del enrutador

  const onSearch = async (id) => {
    const  imagenURL = "https://api.thedogapi.com/v1/images"
    try{
      let response = await  axios(URL + `/raza/${id}`);
      if(response.data.message !== undefined){
        window.alert(response.data.message)
      }
      dispatch(deleteAll());
      response.data.forEach( async element => {
        if(element){ //mando un objeto a la vez;
          if(element.image){
            let imagenReal = await  axios(imagenURL +`/${element.image}`);
            element.image = imagenReal.data.url;
          }
          dispatch(addRaza(element));
        }
      });
      
    }catch(error){
      console.log(error.message);
    }
  }
  const setCurrentPage = async () => {
    console.log('llega');
  }
  const getDogs = async () => {
    const  imagenURL = "https://api.thedogapi.com/v1/images"
    let response = await  axios(URL);
    try{
      response.data.forEach( async element => {
        if(element){ //mando un objeto a la vez;
          let imagenReal = await  axios(imagenURL +`/${element.image}`);
          element.image = imagenReal.data.url;
          dispatch(addRaza(element));
        }
      });
    }catch(error){ 
      console.log(error.message);
    }
  }

  const postDog = async (props) => {
    try{
      let response = await axios.post(URL, props);
      
      window.alert(response.data.message)
    }catch(error){
      console.error('Error al enviar los datos:', error);
    }
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
            <Nav onSearch={onSearch} setCurrentPage={setCurrentPage} /> :
            undefined
          }
      <Routes>

        {/* LOGIN */}
        <Route path='/' element={
          <Login />
        } />

        {/* Home */}
        <Route path='/home' element={
          <Home getDogs={getDogs} getTemperaments={getTemperaments}/>
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
