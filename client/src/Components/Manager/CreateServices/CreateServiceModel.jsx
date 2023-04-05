import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ServiceForm from './ServiceForm';
import { ServicesContext } from './Services';

export default function ResponsiveDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {AddService,service,setService, open, setOpen} = React.useContext(ServicesContext)


  const handleClickOpen = () => {
    setService({
        Id : '',
        Name : '',
        Time : ''
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Add = () => {
    AddService()
    handleClose()
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Service
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Service Form"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText mb={2} >
            Create service form so that user can access it and make token for it
          </DialogContentText>

            <ServiceForm />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={service.Name && service.Time ? false : true}  variant='contained' onClick={Add} autoFocus>
            {
                service.Id === '' ? 'Create' : "Update"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}