import {  DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function DateRangeCalendarValue() {
  function Label({ componentName, valueType, }) {
    const content = (
      <span> 
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=" md:flex w-[100%] justify-center gap-2 px-6 ">
      <DemoItem
        label={<Label componentName="Fecha inicial" valueType="date" />
        }
        sx={{width: {xs: "100%", md: "50%"}, }}
      >
        <DatePicker label="Fecha inicial"/>
      </DemoItem>
      <DemoItem label={<Label componentName="Fecha fin" valueType="date" />}
      sx={{width: {xs: "100%", md: "50%"},  marginBottom: "10px"}} >
        <DatePicker label="Fecha final" />
      </DemoItem>
      </div>
      
    </LocalizationProvider>
  );
}
