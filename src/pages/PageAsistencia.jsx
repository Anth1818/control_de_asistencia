import { Header } from "../components/Header";
import { TableWorkers } from "../components/Table"
import { useState, useEffect } from "react";
import {date} from "../utils/date";

// console.log(data[0].date);

export const PageTrabajadores = () => {

  // const api = "http://172.30.40.23:3000/attendance";
  const localApi = "http://localhost:3000/attendance"

  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(localApi)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(data);  


  return <>
    <Header ViewLogout={true}></Header>
    <div className="mt-4">
      <TableWorkers title="Lista de asistencia" data={data.data} date={date}></TableWorkers>
    </div>

  </>
};
