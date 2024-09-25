import { Header } from "../components/Header";
import { TableAttendance } from "../components/Table"
import { useState, useEffect } from "react";
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
      <TableAttendance title="Lista de asistencia" dataInitial={data.data}></TableAttendance>
    </div>

  </>
};
