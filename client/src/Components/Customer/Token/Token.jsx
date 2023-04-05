import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MultipleSelect from './SelectServices'

const Token = () => {

  const [selectedService, setSelectedService] = useState("");

  const navigate = useNavigate();

  const gotoWaitingRoom = () =>{
    navigate('/waiting-room')
  }

  return (
    <div style={{
        display:'flex',
        width: '100%',
        height: '80vh',
        justifyContent: 'center',
        alignItems : 'center',
        flexDirection: 'column',
      }}>
      <div style={{
        
        backgroundColor:'white',
        padding:'1rem',
        borderRadius:'5px',
        display:'flex',
        flexDirection : 'column',
        alignItems:'center',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
      }}>
        <label htmlFor="" style={{
          alignSelf:'flex-start',
          marginLeft:'.5rem'
        }} >Select Service</label>
        <MultipleSelect  setSelectedService={setSelectedService} />
        <div style={{
          marginTop:'1rem'
        }} >
            <Button variant='contained' disabled={selectedService ? false : true}  onClick={gotoWaitingRoom} > Generate Token </Button>
        </div>
          </div>
    </div>
  )
}

export default Token