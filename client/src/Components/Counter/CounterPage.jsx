import { Alert, Button } from '@mui/material'
import React, { useState } from 'react'

const CounterPage = () => {


    const [userToken, setUserToken] = useState('#####')
    const [counterToken, setCounterToken] = useState(12345)

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <div style={{
                width: '40%',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
            }}>
                <div>User Token</div>
                <h2 style={{ marginBottom:'1rem' }} >{userToken}</h2>

                <div>Counter Token</div>
                <h2 style={{ marginBottom:'1rem' }} >{counterToken}</h2>

                {
                    userToken && 
                <Alert style={{ marginBottom:'1rem' }} severity={userToken === counterToken ? 'success' : 'error'}>
                    {
                        userToken === counterToken ? "Token Match" : "Token Not Match"
                    }
                </Alert>
                }

                <Button variant='contained' color='success' style={{ 
                    marginBottom:'1rem' ,
                    width:'100%'
                    }} >
                    Serviced
                </Button>
                <Button variant='contained' color='primary' style={{ 
                    marginBottom:'1rem',
                    width:'100%'
                    }} >
                    Next
                </Button>

            </div>
        </div>
    )
}

export default CounterPage