import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import departments from '../utils/departments';


SelectDeparment.propTypes = {
  filterId: PropTypes.string,
  department: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChangeDeparment: PropTypes.func,
};

export default function SelectDeparment({ department, handleChangeDeparment}) {

 
  // const disabled = filterId ? true : false;

  return (
    <Box sx={{width: {xs: "97%", md:"49.50%"}}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
        <Select
          // disabled={disabled}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department || ""}
          label="Departamento"
          onChange={handleChangeDeparment}
        > 
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id} name={dept.name}>
              {dept.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
