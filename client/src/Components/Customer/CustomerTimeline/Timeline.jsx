import React from 'react'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CountertopsIcon from '@mui/icons-material/Countertops';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

import { Divider, IconButton } from '@mui/material';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Timeline = () => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding:'1rem'
        }}>

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
                                <div style={{ marginLeft: '1rem' }}>

                                    <h2>
                                        Manager
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
                                    backgroundColor: '#26c6da'
                                }} >
                                    <CountertopsIcon />
                                </div>
                                <div style={{ marginLeft: '1rem' }}>

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
                                </div>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
        </div>
    )
}

export default Timeline