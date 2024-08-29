import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PropTypes from "prop-types";

DateRangeCalendarValue.propTypes = {
  date_start: PropTypes.string,
  date_end: PropTypes.string,
  setDateStart: PropTypes.func,
  setDateEnd: PropTypes.func,
  componentName: PropTypes.string,
};

export default function DateRangeCalendarValue({
  date_start,
  date_end,
  setDateStart,
  setDateEnd,
}) {

  const handleChangeDateStart = (date) => {
    setDateStart(dayjs(date).format("DD/MM/YYYY"));
  };

  const handleChangeDateEnd = (date) => {
    setDateEnd(dayjs(date).format("DD/MM/YYYY"));
  };

  function Label({ componentName }) {
    return (
      <span>
        <strong>{componentName}</strong>
      </span>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="md:flex w-[100%] justify-center gap-2 px-6">
        <DemoItem
          label={<Label componentName="Fecha inicial" />}
          sx={{ width: { xs: "100%", md: "50%" } }}
        >
          <DatePicker
            value={date_start ? dayjs(date_start, "DD/MM/YYYY") : null}
            onChange={handleChangeDateStart}
            format="DD/MM/YYYY"
          />
        </DemoItem>
        <DemoItem
          label={<Label componentName="Fecha fin" />}
          sx={{ width: { xs: "100%", md: "50%" }, marginBottom: "10px" }}
        >
          <DatePicker
            value={date_end ? dayjs(date_end, "DD/MM/YYYY") : null}
            onChange={handleChangeDateEnd}
            format="DD/MM/YYYY"
          />
        </DemoItem>
      </div>
    </LocalizationProvider>
  );
}

