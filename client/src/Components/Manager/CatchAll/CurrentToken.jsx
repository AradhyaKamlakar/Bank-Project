import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Api } from '../../../Utils/Api';
import TokenCard from './TokenCard';
import { useNavigate } from 'react-router';

const CurrentToken = () => {

    const [currentToken, setCurrentToken] = useState({
        tokenNumber : '',
        serviceName : ''
    })
    const [allTokens, setAllTokens] = useState([])

    const navigate = useNavigate();

    const RaiseBuzzer = async () => {
        console.log("under buzzer");
        Api.token.setCurrentToken(currentToken).then((res) => {
            console.log(res);
        })
    }



    const getAllTokes = () => {
        try {

            Api.token.getAllTokens().then((data) => {
                // console.log(data);
                if(data.length === 0) {
                    return;
                }
                setCurrentToken(data[0]);
                setAllTokens(data.slice(1))
            })

        } catch (error) {

        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getAllTokes();
          }, 3000);
      
          return () => clearInterval(interval);
    }, [])



    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }} >
            <div style={{
                width: '350px',
                borderRadius: '5px',
                padding: '1rem',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }} >
                <h1>{currentToken.tokenNumber}</h1>
                <div>{currentToken.serviceName}</div>
                <Button variant='contained' sx={{ marginTop: '1rem' }} onClick={RaiseBuzzer} >
                    Raise Buzzer
                </Button>


            </div>

            <div style={{
                width: '100%',
                display: 'flex',
                flexFlow: 'wrap',
            }} >
                {
                    allTokens.map((e) => {
                        return <TokenCard token={e} />
                    })
                }

            </div>


        </div>
    )
}

export default CurrentToken