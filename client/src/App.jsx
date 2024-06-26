import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"; //This are for us to move trought the page
import { useDispatch } from "react-redux";
import {
  addRaza,
  addTemperament,
  deleteAll,
  deleteDogRedux,
  setSignal,
} from "./redux/actions"; //These are  all our actions from redux
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/home";
import Detail from "./components/Detail";
import Upload from "./components/upload";
import Form from "./components/Form";
import "./App.css";
import { SignUp } from "./components/SignUp";
const URL = "http://localhost:3001/dogs"; //We make petitions from here to the back

function App() {
  const dispatch = useDispatch(); //we get dispatch to use it later
  const location = useLocation(); //we get location to use it later
  const navigate = useNavigate();

  //? Every function that is here we can use it on every part of the front code

  //Put this on false for activate the login
  const [ access, setAcces ] = useState(true);

  //This is the one who manage the access
  useEffect(() => {
    !access && navigate('/');
    access && navigate('/home');
  },[access])

  async function login(props){
    try{
      let response = await axios.post(`${URL}/login`,props);//Se necesita poner .post para enviar datos por props
      if(response.data.message){
        window.alert(response.data.message);
      }else{
          if(response.data.access === true){
            setAcces(true);
          }
      }
    }catch(error){
      console.log(error.message);
    }
  }

  //This is our function that get dogs by id
  const onSearch = async (id) => {
    const imagenURL = "https://api.thedogapi.com/v1/images";
    try {
      let response = await axios(URL + `/raza/${id}`);
      if (response.data.message !== undefined) {
        window.alert(response.data.message);
      } else {
        //We clear the screen
        dispatch(deleteAll());
        //This is send the signal for the current page turn to 0
        dispatch(setSignal(1));
        //we send each dog throung redux
        response.data.forEach(async (element) => {
          if (element) {
            //mando un objeto a la vez;
            if (element.image) {
              let imagenReal = await axios(imagenURL + `/${element.image}`);
              element.image = imagenReal.data.url;
            }
            dispatch(addRaza(element));
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //This function get all the dogs
  const getDogs = async () => {
    const imagenURL = "https://api.thedogapi.com/v1/images";
    let response = await axios(URL);
    try {
      dispatch(deleteAll());
      response.data.forEach(async (element) => {
        if (element) {
          //mando un objeto a la vez;
          if (element.image) {
            let imagenReal = await axios(imagenURL + `/${element.image}`);
            element.image = imagenReal.data.url;
          }
          dispatch(addRaza(element));
        }
      });
      dispatch(setSignal(1));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteDog = async (props) => {
    try {
      let response = await axios.delete(`${URL}/delete/${props}`);
      window.alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
    dispatch(deleteDogRedux(props));
  };

  const postDog = async (props) => {
    try {
      let response = await axios.post(URL, props);
      if (response.data.message === "Data saved successfully") {
        dispatch(setSignal(1));
        dispatch(deleteAll());
        getDogs();
      }
      window.alert(response.data.message);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const getTemperaments = async () => {
    try {
      let response = await axios(URL + `/temperaments`);
      response.data.forEach((element) => {
        dispatch(addTemperament(element.name));
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const logOut = () => {
    setAcces(false);
  }

  const createUser = async (props) => {
    try {
      console.log("Le estoy mandando estos datos", props)
      let response = await axios.post(`${URL}/createuser/`, props);
      window.alert(response.data.message)
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="App">
      {location.pathname !== "/" && location.pathname !== "/signUp" ? (
        //We send the function here for the component to be able to use it
        <Nav onSearch={onSearch} getDogs={getDogs} logOut={logOut}/>
      ) : undefined}
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login login={login}/>} />

        {/* Home */}
        <Route
          path="/home"
          element={<Home getDogs={getDogs} getTemperaments={getTemperaments} />}
        />

        <Route path="/detail/:id" element={<Detail deleteDog={deleteDog} />} />

        <Route
          path="/form/"
          element={<Form postDog={postDog} getTemperaments={getTemperaments} />}
        />

        <Route
          path="/signUp/"
          element={<SignUp createUser={createUser}/>}
        />

        <Route path="/upload/" element={<Upload />} />
      </Routes>
    </div>
  );
}

export default App;
