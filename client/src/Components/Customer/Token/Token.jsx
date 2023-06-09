import { Alert, Button, Collapse, IconButton } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MultipleSelect from './SelectServices'
import { Api } from '../../../Utils/Api';
import { AppContext } from '../../../App';

const Token = () => {

  const [selectedService, setSelectedService] = useState("");

  const { rootUser } = useContext(AppContext)

  const navigate = useNavigate();

  const gotoWaitingRoom = async () => {

    Api.token.createToken(rootUser.id, selectedService).then((data) => {
      console.log(data);
    })

    navigate('/waiting-room')
  }

  const [open, setOpen] = useState(false)


  const getToken = async () => {
    try {

      Api.token.getTokenByUserId(rootUser.id).then((data) => {
        if (data.tokenId) {
          console.log('token found');
          setOpen(true);
        } else {
          navigate('/')
          setOpen(false);
        }
      })

    } catch (error) {

    }
  }

  React.useEffect(() => {

    getToken();

  }, [])

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

        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
      }}>
        <label htmlFor="" style={{
          alignSelf: 'flex-start',
          marginLeft: '.5rem'
        }} >Select Service</label>
        <MultipleSelect setSelectedService={setSelectedService} />
        <div style={{
          marginTop: '1rem'
        }} >
          <Button variant='contained' disabled={selectedService === '' || open ? true : false} onClick={gotoWaitingRoom} > Generate Token </Button>
        </div>
      </div>
      <Collapse in={open} style={{ marginTop:'1rem' }} >
        <Alert
           severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
            >
              
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Your Token is already Created Visit Waiting room page
        </Alert>
      </Collapse>
    </div>
  )
}

export default Token