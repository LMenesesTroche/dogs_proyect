import React, { useEffect, useState } from "react";
import Card from "../Card";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  orderDogsByTemperaments,
  filterDogsByOrigin,
  orderByAbc,
  orderByWeight,
  setSignal,
} from "../../redux/actions";
import perritoPredeterminado from "./perritoPredeterminado.jpg";
//URL de la API
const URL = "http://localhost:3001/dogs";
const itemsPorPagina = 8;

//Esto es todo lo que se muestra al estar en la direccion "/home"
export const Home = ({ getDogs, getTemperaments }) => {
  const dispatch = useDispatch();
  const misRazas = useSelector((state) => state.misRazas); //Sacamos lo que este en misRazas del reducer
  const misTemperamentos = useSelector((state) => state.misTemperamentos); //Tambien sacamos los temperamentos
  const signal = useSelector((state) => state.myCurrentPage); //Sacamos tambien mi señal para avisarme cuando debo poner currentPage en 0
  const [currentPage, setCurrentPage] = useState(0); //Creamos un estado porque mi current page debe actualizarse en tiempo real
  const [items, setItems] = useState([...misRazas].splice(0, itemsPorPagina)); //Items es un auxiliar que se utiliza para delimitar que cartas voy a mostrar

  //Uso useEffect para evitar llamadas infinitas
  useEffect(() => {
    //Solo en caso de que no haya nada en mis razas(Mis perros) llamo a traer los perros de la api, para que no se repitan
    if (misRazas.length === 0) {
      getDogs();
    }
  }, []);
  //Solo llamo una vez para traer mis temperamentos
  useEffect(() => {
    getTemperaments();
  }, []);

  //Cada vez qye haya un cambio en mis razas o current page voy a hacer el paginado
  useEffect(() => {
    /*setemos los items(osea el auxiliar) en un corte de la copia de mis perros, desde la pagina actual multiplicada
    por los items por pagina, hasta los items por pagina*/
    setItems(
      [...misRazas].splice(currentPage * itemsPorPagina, itemsPorPagina)
    );
  }, [misRazas, currentPage]);

  //Aqui recibimos la signal que nos mandan desde la busqueda por raza para cambiar la pagina en la que estamos
  // a 0
  if (signal === 1) {
    setCurrentPage(0);
    //Luego volvemos a cambiar la signal a 0
    dispatch(setSignal(0));
  }
  //Aqui guardamos los datos de tipo de ordenamiento y en que orden(no se si es necesario useState)
  const [orderData, setOrderData] = useState({
    typeOfOrder: "",
    acdc: "",
  });

  //Esta es la funcion que maneja el cambio de pagina hacia adelante
  const handleNext = () => {
    const totalDeElementos = misRazas.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemsPorPagina;
    if (firstIndex >= totalDeElementos) return;
    setItems([...misRazas].splice(firstIndex, itemsPorPagina));
    setCurrentPage(nextPage);
  };

  //Esta es la funcion que maneja el cambio de pagina hacia atras
  const handlePrev = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * itemsPorPagina;
    setItems([...misRazas].splice(firstIndex, itemsPorPagina));
    setCurrentPage(prevPage);
  };

  //Esto maneja el cambio de ordenamiento por temperamentos
  const handleOrderTemperaments = (e) => {
    setCurrentPage(0); //Seteamos la pagina actual en 0
    dispatch(orderDogsByTemperaments(e.target.value)); //Lo mandamos al redux actions
  };

  //Esto maneja el cambio de ordenamiento por origen
  const handleOrigin = (e) => {
    setCurrentPage(0);
    dispatch(filterDogsByOrigin(e.target.value)); //Lo mandamos al redux actions
  };

  //Esto maneja el cambio de ordenamiento por ordenAlfabetico
  const handleOrderABC = (e) => {
    setCurrentPage(0);
    const { value } = e.target;
    setOrderData((prevState) => ({
      //Seteamos el orden de datos con la informacion que nos manden
      ...prevState,
      typeOfOrder: value,
    }));
    dispatch(orderByAbc(value)); //Lo mandamos al redux actions
  };

  //Esto maneja el cambio de ordenamiento por peso
  const handleWeightOrder = (e) => {
    setCurrentPage(0);
    const { value } = e.target;
    setOrderData((prevState) => ({
      //Seteamos el orden de datos con la informacion que nos manden
      ...prevState,
      typeOfOrder: value,
    }));
    dispatch(orderByWeight(value)); //Lo mandamos al redux actions
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtrosYOrdenamientos}>
        <div>
          <label>Filter by temperament</label>
          <select
            onChange={handleOrderTemperaments}
            name="temperament"
            className={styles.sleccionMultiple}
            defaultValue="all"
          >
            {misTemperamentos
              ? misTemperamentos.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))
              : null}
            <option key={1000} value={"all"}>
              All
            </option>
          </select>
        </div>
        <div>
          <label>Filter by origin</label>
          <select
            onChange={handleOrigin}
            name="origin"
            className={styles.sleccionMultiple}
            defaultValue="all"
          >
            <option value={"api"}>API</option>
            <option value={"dataBase"}>Data Base</option>
            <option key={1000} value={"all"}>
              All
            </option>
          </select>
        </div>

        <div>
          <label>Alphabetical order</label>
          <select
            onChange={handleOrderABC}
            name="typeOfOrder"
            className={styles.sleccionMultiple}
            defaultValue="None"
          >
            <option value={"asc"}>Asc</option>
            <option value={"dsc"}>Dsc</option>
            <option value={"None"}>None</option>
          </select>
        </div>
        <div>
          <label>Weight order</label>
          <select
            onChange={handleWeightOrder}
            name="weightOrder"
            className={styles.sleccionMultiple}
            defaultValue="None"
          >
            <option value={"asc"}>Asc</option>
            <option value={"dsc"}> Dsc</option>
            <option value={"None"}> None</option>
          </select>
        </div>
      </div>

      <div className={styles.cards}>
        {items
          ? items.map((element) => (
              <Card
                key={element.id}
                id={element.id}
                image={element.image ? element.image : perritoPredeterminado}
                name={element.name}
                weight={element.weight}
                temperament={element.temperament}
                breed_group={element.breed_group}
              />
            ))
          : null}
      </div>
      <div className={styles.pages}>
        <button onClick={handlePrev} className={styles.botonPrev}>
          {"<"}
        </button>
        <h1 className={styles.currentPage}>Page{currentPage + 1}</h1>
        <button onClick={handleNext} className={styles.botonNext}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Home;
