import { Button } from '@mui/material'
import React from 'react'

const CurrentToken = () => {
  return (
    <div style={{
        width: '100%', 
        display:'flex',
        justifyContent:'center'
    }} >
        <div style={{
            width:'350px',
            borderRadius:'5px',
            padding : '1rem',
            backgroundColor:'white',
            display:'flex',
            flexDirection:'column',
            alignItems: 'center',
        }} >
            <div>Token Number</div>
            <div>User Name</div>
            <Button variant='contained' sx={{ marginTop:'1rem'  }} >
                Raise Buzzer
            </Button>
        </div>
    </div>
  )
}

export default CurrentToken