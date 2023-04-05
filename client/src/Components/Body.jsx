import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import Customer from '../Layouts/Customer'
import Manager from '../Layouts/Manager'
import { Api } from '../Utils/Api'



export const Body = () => {

  const { rootUser, setRootUser } = useContext(AppContext)

  const navigate = useNavigate();


  const getUser = () => {
    if(localStorage.getItem('user_auth') === null) {
      navigate('/login')
    }else{
      console.log(JSON.parse(localStorage.getItem('user_auth')));
      Api.user.getUser(JSON.parse(localStorage.getItem('user_auth'))).then((data)=>{
        console.log("under api",data);
        setRootUser(data)
        
      })

    }
  }

  useEffect(() => {
    getUser();
  }, [])
  

  return (
    <>
      {
        rootUser.role === 'Customer' ? <Customer /> : 
        rootUser.role === 'Manager' ? <Manager /> :
        null
      }
    </>
  )
}
