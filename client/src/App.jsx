import React from 'react'
import Login from './components/Login'
import { Route, Routes, useLocation ,useNavigate} from 'react-router-dom';


import './App.css'

function App() {

  return (
    <div className='App'>
      <Routes>
        
        <Route path='/' element={
          <Login />
        } />

        
      </Routes>
    </div>
  )
}

export default App
