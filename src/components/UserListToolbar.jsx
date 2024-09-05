import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// components
import Iconify from "./Iconify";
import SelectDeparment from "./SelectDeparments";

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 60,
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  })
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterId: PropTypes.string,
  onFilterId: PropTypes.func,
  searchLabel: PropTypes.string,
  department: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onDeparment: PropTypes.func,
  
};

export default function UserListToolbar({
  numSelected,
  filterId,
  onFilterId,
  searchLabel,
  department,
  onDeparment,
  
}) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} Seleccione
        </Typography>
      ) : (
        <div className="w-full flex gap-2 flex-wrap">
          <StyledSearch
            sx={{width:{xs:"97%", md:"49.5%"}}}
            // disabled={department ? true : false}
            value={filterId}
            name="filter"
            onChange={onFilterId}
            placeholder={searchLabel}
            inputProps={{
              pattern: "^[0-9]+$",
              onInvalid: (e) => {
                e.target.setCustomValidity("Por favor, ingrese una cédula válida.");
              },
              onInput: (e) => {
                e.target.setCustomValidity("");
              }
            }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <SelectDeparment filterId={filterId} department={department} handleChangeDeparment={onDeparment} />
        </div>)}
    </StyledRoot>
  );
}
