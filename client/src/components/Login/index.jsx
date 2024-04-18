import {Link} from 'react-router-dom'


export const Login = ({ getDogs }) => {
  const handleClick = () => {
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