import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TokenCard from './TokenCard';
import { Button } from '@mui/material';
import WaitingCustomers from './WaittingCustomers';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function WaitingRoom() {


  const navigate = useNavigate()

  const gotoTimeline = () =>{
    navigate('/customer-timeline')
  }

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={12} sm={12} md={4}>
          <TokenCard />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
          }} >
              <div style={{
                fontWeight:'bold',
                fontSize:'100px'
              }} >
                1234
              </div>
              <Button variant='contained' onClick={gotoTimeline}>
                Go to Manager
              </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
    <WaitingCustomers />
    </>
  );
}