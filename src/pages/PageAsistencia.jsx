import { Header } from "../components/Header";
import { TableWorkers } from "../components/Table"
import data from "../data/data.js";
import { useState, useEffect } from "react";

// console.log(data[0].date);

export const PageTrabajadores = () => {

  const api = "http://172.30.40.23:3000/attendance";

  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);  


  return <>
    <Header ViewLogout={true}></Header>
    <div className="mt-4">
      <TableWorkers title="Lista de asistencia" data={data.data} date={new Date().toLocaleDateString()}></TableWorkers>
    </div>

  </>
};
