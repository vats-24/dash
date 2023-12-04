import { useState, useContext, useEffect } from 'react'
import { Context } from '../../main'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './login.scss';

const Login = () => {

  /*Basic Login Page*/
  let navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated,loading, setLoading } = useContext(Context);
  
  console.log(isAuthenticated)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/users/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      // if(data.message == "success")
      // {
      //   localStorage.setItem("Username",username)
      //   navigate("/")
      // }

      setIsAuthenticated(true);
      console.log("Helllo")
      setLoading(false);

    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);""
    }
  };



  if(isAuthenticated) 
  {
      navigate("/dashboard") // used state but it was giving some error
      localStorage.setItem("Username",username)
       window.location.reload(); 
  }

 


  return (
    <div>
    <div className="app">
      <div className="login-form">
        <div className="title">Log In</div>
            <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type='submit' className='but'>Submit</button>
        </div>
      </form>
    </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
