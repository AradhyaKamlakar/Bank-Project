import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';

export default function MaxWidthDialog({open, setOpen, data}) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');

  const navigate = useNavigate();

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate('/')
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  
  const getStatus = (id) => {
    switch  (id) {
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


  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Service Receipt</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <h2> Status :  {getStatus(data.status)}</h2>
                <h3> Token Number :  {data.tokenNumber}</h3>
                <h3> Service Name :  {data.serviceName}</h3>
                <h3> Generation Time :  {data.tokenGenerationTime?.split('T')[1]}</h3>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}