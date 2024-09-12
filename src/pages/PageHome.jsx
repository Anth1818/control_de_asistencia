import { useEffect, useState } from "react";
import Button from "../components/Button";
import ModalLogin from "../components/ModalLogin";
import { Header } from "../components/Header";
import WorkerDetails from "../components/WorkerDetails";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { date } from "../utils/date";
import configApi from "../api/configApi";

export const PageHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [worker, setWorker] = useState(null);
  const [searchWorkerBtn, setSearchWorkerBtn] = useState(false);
  const [checkInBtn, setCheckInBtn] = useState(false);
  const [checkOutBtn, setCheckOutBtn] = useState(false);
  const [workerIdentity, setWorkerIdentity] = useState("");
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [checkOutSuccess, setCheckOutSuccess] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSearchWorker = (e) => {
    e.preventDefault();
    setSearchWorkerBtn(true);
  };

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
  };

  const apiEndPointGetWorkerByid =
    configApi.apiBaseUrl + configApi.endpoints.searchWorkerById;
  const apiEndPointGetAttendance =
    configApi.apiBaseUrl + configApi.endpoints.getAttendance;

  // ------Buscar trabajador en la base de datos
  useEffect(() => {
    if (workerIdentity) {
      if (searchWorkerBtn || checkInBtn || checkOutBtn) {
        setLoader(true);
        fetch(`${apiEndPointGetWorkerByid}/${workerIdentity}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setWorker(data.data[0]);
                console.log(data);
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setSearchWorkerBtn(false);
            setLoader(false);
          });
      }
    }
  }, [searchWorkerBtn, workerIdentity]);

  // ------Marcar hora de entrada en la base de datos
  useEffect(() => {
    if (checkInBtn){
    fetch(apiEndPointGetAttendance, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: worker?.worker_id }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setCheckInSuccess(true);
            setWorker({
              ...worker,
              date_attendance_string: date,
              date_attendance: date,
              check_in_string: data.data.check_in_string,
              check_out_string: null,
            });
            console.log(data);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setCheckInBtn(false);
      });
  }
}, [checkInBtn]);

  // --------- Actualización de hora de salida en la base de datos
  useEffect(() => {
    if (!checkOutBtn) return;
    if (worker.check_out) return;
    fetch(apiEndPointGetAttendance, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: worker.worker_id }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setCheckOutSuccess(true);
            setWorker({
              ...worker,
              check_out_string: data.data.check_out_string,
            });
            console.log(data);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setCheckOutBtn(false);
      });
  }, [checkOutBtn]);

  useEffect(() => {
    if (checkInSuccess) {
      const timer = setTimeout(() => {
        setCheckInSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [checkInSuccess]);

  useEffect(() => {
    if (checkOutSuccess) {
      const timer = setTimeout(() => {
        setCheckOutSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [checkOutSuccess]);

  // console.log(worker);

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
