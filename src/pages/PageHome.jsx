import { useState } from "react";
import Button from "../components/Button";
import ModalLogin from "../components/ModalLogin";
import { Header } from "../components/Header";
import WorkerDetails from "../components/WorkerDetails";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { date } from "../utils/date";

import { useUser } from "../context/userContext";
import useWorker from "../hooks/useWorker";

export const PageHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchWorkerBtn, setSearchWorkerBtn] = useState(false);
  const [checkInBtn, setCheckInBtn] = useState(false);
  const [checkOutBtn, setCheckOutBtn] = useState(false);
  const [workerIdentity, setWorkerIdentity] = useState("");
  const { setErrorCredentials } = useUser();


  const { worker, loader, checkInSuccess, checkOutSuccess, handleSearchWorker} = useWorker(
    workerIdentity,
    searchWorkerBtn,
    checkInBtn,
    checkOutBtn,
    setSearchWorkerBtn
  );


  const handleCheckInBtn = () => {
    setCheckInBtn(true);
  };

  const handleCheckOutBtn = () => {
    setCheckOutBtn(true);
  };

  const handleUpdateStateModal = () => {
    setShowModal(!showModal);
  };
  const closeModal = () => {
    setShowModal(false);
    setErrorCredentials(null);
  };


  return (
    <>
      <div>
        <Header
          handleUpdateStateModal={handleUpdateStateModal}
          ViewLogin={true}
        ></Header>
        {showModal && <ModalLogin closeModal={closeModal} />}
        <div className="max-w-md mx-auto my-20 p-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-4">Control de asistencia</h1>
          <div className="mb-4">
            <form className="flex items-center" onSubmit={handleSearchWorker}>
              <input
                className=" h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 mr-2 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ingresar cédula"
                type="text"
                pattern="^[0-9]+$"
                maxLength={9}
                minLength={6}
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Por favor, ingrese una cédula válida."
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
                value={workerIdentity}
                onChange={(e) => setWorkerIdentity(e.target.value)}
              />
              <Button type={"submit"}>Buscar</Button>
            </form>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm mb-4"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.0 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Información del Trabajador
              </h3>
              <h6>Fecha: {date}</h6>
            </div>
            {loader ? (
              <p className="text-center">Buscando...</p>
            ) : worker ? (
              <WorkerDetails worker={worker} loader={loader} />
            ) : (
              <p className="text-center">No se ha encontrado información</p>
            )}
          </div>
          <div className="flex justify-center">
            {worker && !worker?.date_attendance && (
              <Button event={handleCheckInBtn}>Marcar hora de entrada</Button>
            )}
            {worker?.date_attendance_string &&
              worker?.check_out_string === null && (
                <Button event={handleCheckOutBtn}>Marcar hora de salida</Button>
              )}
          </div>
          {checkInSuccess && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              sx={{ marginTop: "10px" }}
            >
              Hora de entrada registrada con éxito
            </Alert>
          )}
          {checkOutSuccess && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
              sx={{ marginTop: "10px" }}
            >
              Hora de salida registrada con éxito
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
export default PageHome;
