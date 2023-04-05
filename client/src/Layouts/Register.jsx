import React, { useContext, useState } from 'react'
import '../Style/Login.css'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Api } from '../Utils/Api';
import { AppContext } from '../App';

const Register = () => {

    const navigate = useNavigate();
    const {setRootUser} = useContext(AppContext)

    const gotoLogin = () => {
        navigate(`/login`);
    }

    const validate = () => {
        if(localStorage.getItem('user_auth') === null) {
          navigate('/register')
        }else{
            Api.user.getUser(JSON.parse(localStorage.getItem('user_auth'))).then((data)=>{
                console.log(data);
                if(data.id){
                  setRootUser(data);
                  navigate('/')
                }else{
                  navigate('/register')
                }
              })
        }
      }
    
      React.useEffect(() => {
        validate();
      }, [])

    const [formData, setFormData] = useState({
        AccountNumber : '',
        Name : '',
        Password : '',
        ConfirmPassword : '',
    })

    const handleChange = (e) => {

        var name = e.target.name
        var value = e.target.value

        setFormData({
            ...formData,
            [name] : value
        })

    }

    const submitForm = async () => {

        try {

            console.log('under submit 1');
            
            if(formData.Password !== formData.ConfirmPassword) return;
            console.log('under submit 2');

            Api.user.Register({
                AccountNumber : formData.AccountNumber,
                Name : formData.Name,
                Password : formData.Password,
                Role : 'Customer'
            }).then((data)=>{
                console.log(data);
            })

            gotoLogin();

            // const data = await res.json();

        } catch (error) {
            
        }

    }

    return (
        <div className='login_body' >
            <div className='login_div'>
                <h2 className='mb_1' >Register</h2>
                <TextField 
                    id="standard-basic" 
                    label="Account Number" 
                    variant="standard" 
                    name='AccountNumber'
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom:'1rem' }} 
                />
                <TextField 
                    id="standard-basic" 
                    label="User Name" 
                    variant="standard"
                    name='Name'
                    onChange={handleChange} 
                    style={{ width: '100%', marginBottom:'1rem' }} 
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    name='Password'
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom:'1rem' }} 
                />
                <TextField
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    name='ConfirmPassword'
                    onChange={handleChange}
                    autoComplete="current-password"
                    variant="standard"
                    style={{ width: '100%', marginBottom:'1rem' }} 
                />
                <Button variant="contained" style={{ width: '100%', marginBottom:'1rem' }} onClick={submitForm} >Register</Button>
                <Button variant="text" style={{ width: '100%' }}  onClick={gotoLogin} >Login</Button>

            </div>
        </div>
    )
}

export default Register