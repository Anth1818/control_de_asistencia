import { Header } from "../components/Header";
import { TableWorkers } from "../components/Table"
import data from "../data/data.js";

console.log(data[0].date);

export const PageTrabajadores = () => {
  return <>
  <Header logout={true}></Header>
  <TableWorkers title="Lista de trabajadores" data={data[0].workers} date={data[0].date}></TableWorkers>
  </>
};
