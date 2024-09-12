import { Header } from "../components/Header";
import { TableWorkers } from "../components/Table"
import { useState, useEffect } from "react";
import {date} from "../utils/date";
import configApi from "../api/configApi";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
// console.log(data[0].date);

export const PageTrabajadores = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  // const api = "http://172.30.40.23:3000/attendance";
  // const localApi = "http://localhost:3000/attendance"
  const apiEndPointGetAttendanceToday = configApi.apiBaseUrl + configApi.endpoints.getAttendance;


  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(apiEndPointGetAttendanceToday)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  // console.log(data);  


  return <>
    <Header ViewLogout={true} handleLogout={handleLogout}></Header>
    <div className="mt-4">
      <TableWorkers title="Lista de asistencia" data={data.data} date={date}></TableWorkers>
    </div>

  </>
};
