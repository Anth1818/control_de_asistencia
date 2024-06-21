import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateRangeCalendarValue() {
  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span> 
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem
        label={<Label componentName="Fecha inicial" valueType="date" />
        }
      >
        <DatePicker />
      </DemoItem>
      <DemoItem label={<Label componentName="Fecha fin" valueType="date" />}>
        <DatePicker />
      </DemoItem>
    </LocalizationProvider>
  );
}
