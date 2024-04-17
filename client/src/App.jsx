import React from 'react'
import Login from './components/Login'
import { Route, Routes, useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addRaza } from './redux/actions';
import Nav from './components/Nav';
import Home from './components/home';
import axios from 'axios'
import './App.css'
import Listado from './components/Listado';
const URL = 'http://localhost:3001/dogs';

//Nombre falso = AffenpinScher
function App() {
  const dispatch = useDispatch();

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
            <Nav onSearch={onSearch} /> :
            undefined
         }
      <Routes>
        
        <Route path='/' element={
          <Login />
        } />

        <Route path='/home' element={
          <Home />
        } />
        <Route path='/listado' element={
          <Listado />
        } />

        
      </Routes>
    </div>
  )
}

export default App
