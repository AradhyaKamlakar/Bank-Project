import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';

import CountertopsIcon from '@mui/icons-material/Countertops';
import AccountMenu from './Menu';
import { ServicesContext } from './Services';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ServicesList() {

    const {data} = React.useContext(ServicesContext)

    return (
        <div>

            <Box sx={{ flexGrow: 1, mt: 5 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((service, index) => (
                        <Grid item xs={12} sm={12} md={4} key={index}>
                            <Item style={{
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
                                textAlign: 'left',
                                // padding: '2rem',
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
                                    }} >
                                        <div style={{
                                            padding: '1.5rem',
                                            borderRadius: '5px',
                                            backgroundColor: '#bbdefb'
                                        }} >
                                            <CountertopsIcon />
                                        </div>
                                        <div style={{ marginLeft: '1rem' }}>

                                            <h2>
                                                {service.Name}
                                            </h2>
                                            <h3>{service.Time} min</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <AccountMenu service={service} />
                                    </div>

                                </div>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}