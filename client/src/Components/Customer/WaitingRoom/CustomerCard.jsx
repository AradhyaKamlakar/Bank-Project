import { Avatar, Grid } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react'
import { Api } from '../../../Utils/Api';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const CustomerCard = ({ item }) => {

    const [user, setUser] = useState({})
    
    const getStatus = (id) => {
        switch (id) {
            case 0:
                return "Pending";
            case 1:
                return "No Show";
            case 3:
                return "Being Served";
            case 4:
                return "Serviced";
            default:
                return "Abandoned"
        }
    }


    const getUser = () => {
        Api.user.getUserById(item.userId).then((data)=>{
            setUser(data);
        })
    }

    useEffect(() => {
        getUser()
    }, [])
    

    return (
            <Grid item xs={12} sm={12} md={4} >
                <Item style={{
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                    textAlign: 'left',
                    padding: '2rem',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between'
                    }} >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>

                            <Avatar />
                            <div style={{ marginLeft: '1rem' }}>
                                <p>{user.name}</p>
                                <p>{item.serviceName}</p>
                            </div>
                        </div>
                        <div>
                            {getStatus(item.status)}
                        </div>

                    </div>
                </Item>
            </Grid>
    )
}

export default CustomerCard
