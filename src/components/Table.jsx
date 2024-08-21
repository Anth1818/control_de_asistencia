// import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useEffect } from "react";
import { Collapse, IconButton, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";
import { Box, Stack } from "@mui/system";
import { filter } from "lodash";
// import { Link } from "react-router-dom";
import UserListToolbar from "./UserListToolbar";
import PropTypes from "prop-types";
import DateRangeCalendarValue from "./DateRangeCalenderValue";
// import SelectDateSearch from "./SelectDateSearch";
import Button from "./Button";

const columns = [
  { id: "details_user", label: "Detalles", align: "center" },
  { id: "identity_card", label: "Cédula", minWidth: 170, align: "center" },
  { id: "department", label: "Departamento", minWidth: 170, align: "center" },
  {
    id: "full_name",
    label: "Nombre y Apellido",
    minWidth: 100,
    align: "center",
  },
  {
    id: "date_attendance",
    label: "Fecha",
    minWidth: 170,
    align: "center",
  },
  // {
  //   id: "hora_entrada",
  //   label: "Hora de entrada",
  //   minWidth: 170,
  //   align: "center",
  // },
  // {
  //   id: "hora_salida",
  //   label: "Hora de salida",
  //   minWidth: 170,
  //   align: "center",
  // },
  // {
  //   id: "exportar",
  //   label: "Exportar",
  //   minWidth: 170,
  //   align: "center",
  // },
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

export function TableWorkers({ data, title, date }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data);
  }, []);



  // ----------Rango de fecha
  const [fecha_start, setFecha_start] = useState("");
  const [fecha_end, setFecha_end] = useState("");

  // ----------Paginación y filtro por cédula
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRows, setOpenRows] = useState({});
  const [filterId, setFilterId] = useState("");
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  // -------Departamentos
  const [deparment, setDeparment] = useState("");
  const handleChangeDepartment = (event) => {
    setDeparment(event.target.value);
  };

  const fecha_actual = new Date().toLocaleDateString();
  const [fecha, setFecha] = useState(fecha_actual);

  function applySortFilter(array, comparator, query, ) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        stabilizedThis,
        (_user) => _user[0]?.cedula.toString().indexOf(query) !== -1
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

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterId,
    deparment
  );
  const isNotFound = !filteredUsers?.length && !!filterId;

  // const filteredUsersReverse = [...filteredUsers].reverse();
  // console.log(filterId)

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

          <Stack direction="column" flexWrap={"wrap"} justifyContent={"center"}>
            <label className="ml-6">
              <b>Buscar por:</b>{" "}
            </label>
            <UserListToolbar
              // numSelected={selected.length}
              filterId={filterId}
              onFilterId={handleFilterById}
              searchLabel="Buscar por cédula"
              deparment={deparment}
              onDeparment={handleChangeDepartment}
            />

            <label className="ml-6 mt-2">
              <b>Rango de fecha:</b>{" "}
            </label>
            <DateRangeCalendarValue />
            {/* <SelectDateSearch /> */}
          </Stack>
          <div className="w-[95%] mx-[2.5%] flex justify-center content-center mb-2 gap-2 flex-wrap">
            <Button halfWidth>Aplicar Filtros</Button>
            <Button>Exportar a pdf</Button>
            <Button>Exportar a excel</Button>
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
              {filteredUsers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <React.Fragment key={row.identity_card}>
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
                                  : row.check_in}
                              </div>
                              <div>
                                <b>Hora de salida:</b>{" "}
                                {row.check_out === ""
                                  ? "Sin datos"
                                  : row.check_out}
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
                        No encontrado
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
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          labelRowsPerPage="Filas por página"
          count={users?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
TableWorkers.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  date: PropTypes.string,
};
