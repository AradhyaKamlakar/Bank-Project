import React, { useContext } from "react";
import "../Style/Login.css";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Api } from "../Utils/Api";
import { AppContext } from "../App";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name : '',
    Password : ''
  })

  const {setRootUser} = useContext(AppContext)

  const gotoRegister = () => {
    navigate(`/register`);
  };

  const changeHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    setFormData({
      ...formData,
      [name] : value
    })

  }


  const validate = () => {
    if(localStorage.getItem('user_auth') === null) {
      navigate('/login')
    }else{
      Api.user.getUser(parseInt(JSON.parse(localStorage.getItem('user_auth')))).then((data)=>{
        console.log(data);
        if(data.status === 400) navigate('/login')
        else{
          setRootUser(data)
          navigate('/')
        }
      })
    }
  }

  React.useEffect(() => {
    validate();
  }, [])
 

  const handleLogin = () => {
    
    if(formData.Name === '' || formData.Password === '') return;

    Api.user.Login(formData).then((data)=>{
      // console.log(data);
      if(data.id){
        localStorage.setItem('user_auth', JSON.stringify(data));
        setRootUser(data);
        navigate('/');
      }
    })

  };

  return (
    <div className="login_body">
      <div className="login_div">
        <h2 className="mb_1">Login</h2>
        <TextField
          id="standard-basic"
          label="User Name"
          variant="standard"
          style={{ width: "100%", marginBottom: "1rem" }}
          name = "Name"
          value={formData.Name}
          onChange={changeHandler}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          style={{ width: "100%", marginBottom: "1rem" }}
          name = "Password"
          value={formData.Password}
          onChange={changeHandler}
        />

        <Button
          variant="contained"
          style={{ width: "100%", marginBottom: "1rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button variant="text" style={{ width: "100%" }} onClick={gotoRegister}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
