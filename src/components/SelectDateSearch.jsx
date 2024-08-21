
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function SelectDateSearch() {
    const [dateSearch, setDateSearch] = useState('');

    const handleChange = (event) => {
        setDateSearch(event.target.value);
    };

    const date = new Date().toLocaleDateString()

    const today = date; // Fecha actual
    const last7Days = new Date(new Date().setDate(new Date().getDate() - 7)).toLocaleDateString(); // Fecha de hace 7 días
    const last15Days = new Date(new Date().setDate(new Date().getDate() - 15)).toLocaleDateString(); // Fecha de hace 15 días
    const last30Days = new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString(); // Fecha de hace 30 días

    
    // console.log(today, last7Days, last15Days, last30Days);



    return (
        <Box sx={{width: "95%", margin:"0 2.5% 10px 2.5%"}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> Fecha a consultar</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dateSearch}
                    label="Fecha a consultar"
                    onChange={handleChange}
                >
                    <MenuItem value={today}>Hoy</MenuItem>
                    <MenuItem value={last7Days}>Últimos 7 días</MenuItem>
                    <MenuItem value={last15Days}>Últimos 15 días</MenuItem>
                    <MenuItem value={last30Days}>Últimos 30 días</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}