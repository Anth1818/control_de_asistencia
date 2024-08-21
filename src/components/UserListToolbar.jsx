import PropTypes from "prop-types";
// @mui
import { styled} from "@mui/material/styles";
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
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: "49.5%",
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
  deparment: PropTypes.string,
  onDeparment: PropTypes.func,
};

export default function UserListToolbar({
  numSelected,
  filterId,
  onFilterId,
  searchLabel,
  deparment,
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
        <StyledSearch
          disabled={deparment ? true : false}
          value={filterId}
          name="filter"
          onChange={onFilterId}
          placeholder={searchLabel}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}
      <SelectDeparment filterId={filterId} deparment={deparment} handleChangeDeparment={onDeparment} />
    </StyledRoot>
  );
}
