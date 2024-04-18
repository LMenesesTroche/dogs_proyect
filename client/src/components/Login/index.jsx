import {Link} from 'react-router-dom'


export const Login = (props) => {
  const { getDogs } =  props;// Nos traemos la funcion que hace la busqueda 

  const handleClick = () =>{
      getDogs();
   }
  return (
    <div>
        <Link to="/home">
            <button onClick={handleClick}>Home</button>
        </Link>
    </div>
  );
};

export default Login;