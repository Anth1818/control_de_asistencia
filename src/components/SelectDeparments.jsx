import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


SelectDeparment.propTypes = {
  filterId: PropTypes.string,
  deparment: PropTypes.string,
  handleChangeDeparment: PropTypes.func,
};

export default function SelectDeparment({filterId, deparment, handleChangeDeparment}) {
 
  const disabled = filterId ? true : false;

  return (
    <Box sx={{ minWidth: "49.5%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
        <Select
          disabled={disabled}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deparment}
          label="Departamento"
          onChange={handleChangeDeparment}
        > 
          <MenuItem value={""}>Sin seleccionar</MenuItem>
          <MenuItem value={"Informatica"}>Informatica</MenuItem>
          <MenuItem value={"OAC"}>OAC</MenuItem>
          <MenuItem value={"Recursos humanos"}>Recursos humanos</MenuItem>
          <MenuItem value={"Contabilidad"}>Contabilidad</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
