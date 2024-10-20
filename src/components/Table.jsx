// import * as React from "react";
import { Alert, Box, Collapse, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";
import { Stack } from "@mui/system";
import { filter, } from "lodash";
import UserListToolbar from "./UserListToolbar";
import PropTypes from "prop-types";
import DateRangeCalendarValue from "./DateRangeCalenderValue";
import Button from "./Button";
import handleExportPDF from "../utils/exportPDF.js";
import departments from "../utils/departments";
import useAttendance from "../hooks/useAttendance";
import { date } from "../utils/date.js";


export function TableAttendance({ dataInitial, title }) {

  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");

  const [applyFilter, setApplyFilter] = useState(false);
  const [holdResults, setHoldResults] = useState(false);

  // ----------Paginación y filtro por cédula
  const [page, setPage] = useState(0);
  const [pageDB, setPageDB] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openRows, setOpenRows] = useState({});
  const [filterId, setFilterId] = useState("");
  const [orderBy] = useState("name");
  const [order] = useState("asc");

  // -------Departamentos
  const [department, setDeparment] = useState(0);

  const { attendance, dateNoValid, disabledBtnNewResults, setDateNoValid, setAttendance, setDisableHoldResults } = useAttendance(
    dataInitial,
    applyFilter,
    pageDB,
    filterId,
    date_start,
    date_end,
    department,
    holdResults,
    setApplyFilter,
    setHoldResults
  );


  const columns = [
    { id: "details_user", label: "Detalles", align: "center", minWidth: 120 },
    { id: "identity_card", label: "Cédula", minWidth: 170, align: "center" },
    { id: "department", label: "Departamento", minWidth: 170, align: "center" },
    {
      id: "full_name",
      label: "Nombre y Apellido",
      minWidth: 100,
      align: "center",
    },
    {
      id: "date_attendance_string",
      label: "Fecha",
      minWidth: 170,
      align: "center",
    },
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // ----------Rango de fecha

  const handleChangeDepartment = (event) => {
    setDeparment(event.target.value);
  };

  const departmentSelected = departments.find((dept) => dept.id === department);

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        stabilizedThis,
        (_user) => _user[0]?.identity_card.toString().indexOf(query) !== -1
      ).map((el) => el[0]);
    }
    return stabilizedThis?.map((el) => el[0]);
  }

  const handleFilterById = (event) => {
    setPage(0);
    setFilterId(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleRowDetails = (userId) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [userId]: !prevOpenRows[userId],
    }));
  };

  const filteredAttendance = applySortFilter(
    attendance,
    getComparator(order, orderBy),
    filterId
  );

  const isNotFound = !filteredAttendance?.length && !!filterId;

  const handleClearFilters = () => {
    setFilterId("");
    setDate_start("");
    setDate_end("");
    setDeparment(0);
  };
  const handleFetchByFilters = (event) => {
    event.preventDefault();
    setApplyFilter(true);
  };

  const handleClearResults = () => {
    setAttendance([]);
    setPageDB(1);
    setDisableHoldResults(false);
    setPage(0);
    setHoldResults(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper sx={{ width: "90%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Stack
            direction="column"
            flexWrap={"wrap"}
            justifyContent={"space-around"}
            px={3}
            pt={3}
          >
            <Typography variant="h4" gutterBottom align="center">
              {title}
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              Fecha: {date}
            </Typography>
          </Stack>

          <form onSubmit={handleFetchByFilters}>
            <Stack
              direction="column"
              flexWrap={"wrap"}
              justifyContent={"center"}
            >
              <label className="ml-6 mb-9 lg:mb-0">
                <b>Buscar por:</b>{" "}
              </label>
              <UserListToolbar
                // numSelected={selected.length}
                filterId={filterId}
                onFilterId={handleFilterById}
                searchLabel="Buscar por cédula"
                department={department}
                onDeparment={handleChangeDepartment}
              />

              <label className="ml-6 mt-9 lg:mt-2">
                <b>Rango de fecha:</b>{" "}
              </label>
              <DateRangeCalendarValue
                date_start={date_start}
                date_end={date_end}
                setDateStart={setDate_start}
                setDateEnd={setDate_end}
              />
              {/* <SelectDateSearch /> */}
            </Stack>
            <div className="w-[95%] mx-[2.5%] flex flex-col justify-center content-center mb-2 gap-2 flex-wrap">
              {
                <Alert
                  severity="error"
                  sx={{
                    display: dateNoValid ? "flex" : "none",
                    justifyContent: "center",
                  }}
                >
                  Rango de fecha no válido
                </Alert>
              }
              <Button
                halfWidth
                type={"submit"}
                event={() => {
                  setDateNoValid(false);
                  setHoldResults(false);
                  setPageDB(1);
                }}
              >
                Aplicar Filtros
              </Button>
            </div>
          </form>
          <div className="w-full flex justify-center gap-2 mb-2 flex-wrap">
            <Button
              event={() => {
                handleExportPDF(
                  date_start,
                  date_end,
                  departmentSelected,
                  filterId,
                  filteredAttendance,
                  date
                );
              }}
            >
              Exportar a pdf
            </Button>
            <Button event={handleClearFilters}>Limpiar filtros</Button>
            <Button event={handleClearResults}>Borrar resultados</Button>
            <Button
              event={() => {
                setPageDB(pageDB + 1);
              }}
              disabled={disabledBtnNewResults}
            >
              Cargar mas resultados
            </Button>
          </div>

          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgb(17, 24, 39)",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      tabIndex={-1}
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
                      }}
                    >
                      {columns.map((column) => {
                        if (column.id === "details_user") {
                          return (
                            <TableCell key={column.id} align="center">
                              <IconButton
                                aria-label="toggle row details"
                                onClick={() => toggleRowDetails(row.id)}
                                color="inherit"
                              >
                                <InfoIcon />
                              </IconButton>
                            </TableCell>
                          );
                          // } else if (column.id === "exportar") {
                          //   return (
                          //     <TableCell key={column.id} align="center" sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          //       <Button >Exportar a pdf</Button>
                          //       <Button >Exportar a excel</Button>
                          //     </TableCell>
                          //   );
                          // }
                        } else {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={columns.length}
                      >
                        <Collapse
                          in={openRows[row.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          {/* Contenido de los detalles del usuario */}
                          <Box
                            padding={3}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              width: "100%",
                              gap: "20px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                                flexWrap: "wrap",
                                gap: "10px",
                              }}
                            >
                              <div>
                                <b>Hora de entrada:</b>{" "}
                                {row.check_in === ""
                                  ? "Sin datos"
                                  : row.check_in_string}
                              </div>
                              <div>
                                <b>Hora de salida:</b>{" "}
                                {row.check_out === ""
                                  ? "Sin datos"
                                  : row.check_out_string}
                              </div>
                              {/* <div>
                                <b>Genero:</b>{" "}
                                {row.genero === "" ? "Sin datos" : row.genero}
                              </div>
                              <div>
                                <b>Dirreción:</b>{" "}
                                {row.direccion === undefined
                                  ? "Sin dirección "
                                  : row.direccion}
                              </div>
                              <div>
                                <b>Estatus:</b>{" "}
                                {row.estatus ? "Activo " : "Inactivo"}
                              </div> */}
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={columns.length}
                    sx={{ py: 3 }}
                  >
                    <Paper
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        {isNotFound && "No encontrado"}
                      </Typography>

                      <Typography variant="body2">
                        No hay resultados para &nbsp;
                        <strong>&quot;{filterId}&quot;</strong>.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            {filteredAttendance?.length === 0 && (
              <TableBody>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={columns.length}
                    sx={{ py: 3 }}
                  >
                    <Paper
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        {"No hay registros"}
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          labelRowsPerPage="Filas por página"
          count={attendance?.length || 0}
          rowsPerPage={rowsPerPage || 0}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
TableAttendance.propTypes = {
  dataInitial: PropTypes.array,
  title: PropTypes.string,
  date: PropTypes.string,
};
