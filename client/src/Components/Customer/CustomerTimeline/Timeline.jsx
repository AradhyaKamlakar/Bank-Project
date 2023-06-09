import React, { useEffect, useState } from 'react'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CountertopsIcon from '@mui/icons-material/Countertops';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

import { Alert, Button, CircularProgress, Divider, IconButton } from '@mui/material';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';
import { Api } from '../../../Utils/Api';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App';
import MaxWidthDialog from './Dialog';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Timeline = () => {



    const navigate = useNavigate()

    const { rootUser } = React.useContext(AppContext)


    const [token, setToken] = React.useState({})

    const [progress, setProgress] = useState(false)


    const getStatus = (id) => {
        switch (id) {
            case 0:
                return "Pending";
            case 1:
                return "No Show";
            case 2:
                return "Being Served";
            case 3:
                return "Serviced";
            default:
                return "Abandoned"
        }
    }


    const [open, setOpen] = useState(false)

    const getToken = async () => {
        try {
            Api.token.getTokenByUserId(rootUser.id).then((data) => {
                if (data.tokenId) {
                    console.log('token found');
                    console.log(data);
                    setToken(data)
                } else {
                    Api.token.getHistoryTokenById().then((data)=>{
                        console.log(data);
                        setToken(data)
                        setOpen(true);
                    })
                    // navigate('/')
                }
            })



        } catch (error) {

        }
    }


    useEffect(() => {

            const interval = setInterval(() => {
                getToken();
            }, 3000);

            return () => clearInterval(interval);
    }, [])


    const gotoServiceCounter = () => {
        Api.token.setCurrentUserToken(token).then((data) => {
            console.log(data);
        })
    }





    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '1rem'
        }}>
            {/* <div style={{
                position:'absolute',

            }} >

                <Alert severity="success">This is a success alert — check it out!</Alert>
            </div> */}
            <MaxWidthDialog open={open} setOpen={setOpen} data={token} />

            <Grid container spacing={{ xs: 5, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={12} sm={12} md={4} >
                    <Item style={{
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                        textAlign: 'left',
                        // padding: '2rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }} >
                            <div style={{
                                padding: '1.5rem',
                                borderRadius: '5px',
                                backgroundColor: '#42a5f5'
                            }} >
                                <ManageAccountsIcon />
                            </div>
                            <div style={{ marginLeft: '1rem', width: '100%' }}>

                                <h2 style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%'
                                }} >
                                    <div>

                                        Cash All
                                    </div>
                                    {
                                        progress &&
                                        <CircularProgress size={20} />
                                    }

                                </h2>
                            </div>
                        </div>

                    </Item>
                    {
                        !progress &&
                        <Button variant='contained' onClick={gotoServiceCounter} style={{
                            width: '100%',
                            marginTop: '1rem'
                        }} >
                            Go To Service
                        </Button>
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <Item style={{
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                        textAlign: 'left',
                        // padding: '2rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }} >
                            <div style={{
                                padding: '1.5rem',
                                borderRadius: '5px',
                                backgroundColor: '#26c6da'
                            }} >
                                <CountertopsIcon />
                            </div>
                            <div style={{ marginLeft: '1rem' }}>
                                <p>{token.serviceName}</p>
                                <h2>
                                    Service Counter
                                </h2>
                            </div>
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <Item style={{
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                        textAlign: 'left',
                        // padding: '2rem',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }} >
                            <div style={{
                                padding: '1.5rem',
                                borderRadius: '5px',
                                backgroundColor: '#00b0ff'
                            }} >
                                <DonutLargeIcon />
                            </div>
                            <div style={{ marginLeft: '1rem' }}>

                                <h2>
                                    Status
                                </h2>
                                <p>{getStatus(token.status)}</p>
                            </div>
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
}

export default Timeline