
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ServicesContext } from './Services';
import { type } from '@testing-library/user-event/dist/type';

const ServiceForm = ({ serviceName, setServiceName }) => {

  const { AddService, service, setService } = React.useContext(ServicesContext)

  const handleChange = (val) => {
    setService({
      ...service,
      'Name': val
    });
  }

  function isInDesiredForm(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
  }

  const timeChange = (val) => {

    if(val === ''){
      setService({
        ...service,
        'Time': ''
      });
      return;
    }

    if (isInDesiredForm(val)) {

      setService({
        ...service,
        'Time': parseInt(val)
      });
    }
  }


  return (
    <div>
      <TextField id="standard-basic" value={service.Name} onChange={(e) => handleChange(e.target.value)} label="Service Name" variant="standard" style={{
        width: '100%',
        marginBottom: '1rem'
      }} />
      <TextField id="standard-basic" value={service.Time} onChange={(e) => timeChange(e.target.value)} label="Service Time(in minutes)" variant="standard" style={{
        width: '100%'
      }} />
    </div>
  )
}

export default ServiceForm