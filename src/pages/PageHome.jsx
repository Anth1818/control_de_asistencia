import { useState } from "react";
import Button from "../components/Button";
import ModalLogin from "../components/ModalLogin";
import { Header } from "../components/Header";

export const PageHome = () => {
  const [showModal, setShowModal] = useState(false);

  const handleUpdateStateModal = () => {
    setShowModal(!showModal);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const date = new Date().toLocaleDateString();
  return (
    <>
      <div>
        <Header handleUpdateStateModal={handleUpdateStateModal} login={true}></Header>
        {showModal && <ModalLogin closeModal={closeModal} />}
        <div className="max-w-md mx-auto my-20 p-4 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-4">Asistencia de Empleados</h1>
          <div className="flex items-center mb-4">
            <input
              className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 mr-2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ingrese Cédula del trabajador"
              type="text"
            />
            <Button>Buscar</Button>
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
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 font-medium">Cédula:</p>
                  <p>27451286</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Nombre:</p>
                  <p>John Doe</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Departamento:</p>
                  <p>Ventas</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Cargo:</p>
                  <p>Gerente</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Hora de entrada:</p>
                  <p> 09:30 AM</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Hora de salida:</p>
                  <p> 06:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button>Marcar hora de entrada</Button>
            <Button>Marcar hora de salida</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PageHome;
