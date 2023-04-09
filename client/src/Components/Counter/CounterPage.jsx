import { Alert, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Api } from '../../Utils/Api'

const CounterPage = () => {


    const [userToken, setUserToken] = useState('#####')
    const [counterToken, setCounterToken] = useState(12345)



    const getCurrentUserToken = () => {
        try {
            Api.token.getCurrentUserToken().then((data) => {
                setUserToken(data);
            })
        } catch (error) {

        }
    }


    const getCurrentToken = () => {
        try {

            Api.token.getCurrentToken().then((data) => {
                setCounterToken(data);
            })

        } catch (error) {

        }
    }



    useEffect(() => {


        const interval = setInterval(() => {
            getCurrentUserToken();
            getCurrentToken();

        }, 3000);

        return () => clearInterval(interval);

    }, [])


    const setNoShowStatus = () => {
        Api.counter.setNoShowStatus(userToken.tokenId).then((data) => {
            console.log(data);
        });
    }

    const setServicedStatus = () => {
        Api.counter.setServicedStatus(userToken.tokenId).then((data) => {
            console.log(data);
        });
    }


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
                <h2 style={{ marginBottom: '1rem' }} >{userToken.tokenNumber}</h2>

                <div>Counter Token</div>
                <h2 style={{ marginBottom: '1rem' }} >{counterToken.tokenNumber}</h2>

                {
                    userToken &&
                    <Alert style={{ marginBottom: '1rem' }} severity={userToken.tokenNumber === counterToken.tokenNumber ? 'success' : 'error'}>
                        {
                            userToken.tokenNumber === counterToken.tokenNumber ? "Token Match" : "Token Not Match"
                        }
                    </Alert>
                }

                <Button variant='contained' onClick={setServicedStatus} disabled={
                    userToken.tokenNumber !== counterToken.tokenNumber ||
                    userToken.serviceName !== counterToken.serviceName
                } color='success' style={{
                    marginBottom: '1rem',
                    width: '100%'
                }} >
                    Serviced
                </Button>
                <Button variant='contained' onClick={setNoShowStatus} color='primary' style={{
                    marginBottom: '1rem',
                    width: '100%'
                }} >
                    Next
                </Button>

            </div>
        </div>
    )
}

export default CounterPage