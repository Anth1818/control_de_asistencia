import { Header } from "../components/Header";
import { TableWorkers } from "../components/Table"
import data from "../data/data.js";

// console.log(data[0].date);

export const PageTrabajadores = () => {
  return <>
    <Header ViewLogout={true}></Header>
    <div className="mt-4">
      <TableWorkers title="Lista de asistencia" data={data[0].workers} date={data[0].date}></TableWorkers>
    </div>

  </>
};
