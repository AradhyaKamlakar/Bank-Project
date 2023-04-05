import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Api } from '../../../Utils/Api';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ setSelectedService }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const [services, setServices] = React.useState([])

  const getServices = async () => {

    try {

      Api.service.getServices().then((data) => {
        setServices(data);
      })

    } catch (error) {

    }

  }


  React.useEffect(() => {
    getServices();
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedService(value)
    console.log(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <InputLabel id="demo-multiple-name-label">Services</InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Service" notched={false} />}
          MenuProps={MenuProps}
          size='small'
        >
          {services.map((service) => (
            <MenuItem
              key={service.Id}
              value={service.Id}
              style={getStyles(service.Id, services, theme)}
            >
              {service.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}