import { Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from "prop-types";


function WorkerDetails({ worker }) {

  const {
    identity_card, full_name, department, position, check_in_string,
    check_out_string, date_attendance, date_attendance_string } = worker;

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 font-medium">Cédula:</p>
          <p>{identity_card}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Nombre completo:</p>
          <p>{full_name}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Departamento:</p>
          <p>{department}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Cargo:</p>
          <p>{position ? position : "Cargo no especificado"}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Hora de entrada:</p>
          <p> {check_in_string ? check_in_string : "Sin datos"}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Hora de salida:</p>
          <p>{check_out_string ? check_out_string : "Sin datos"}</p>
        </div>
      </div>
      {date_attendance && check_in_string && check_out_string && (

        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{marginTop:"10px"}}>
          Asistencia registrada el {date_attendance_string}
        </Alert>
      )}
    </div>
  );
}
WorkerDetails.propTypes = {
  worker: PropTypes.shape({
    identity_card: PropTypes.number,
    full_name: PropTypes.string,
    department: PropTypes.string,
    position: PropTypes.string,
    check_in_string: PropTypes.string,
    check_out_string: PropTypes.string,
    date_attendance: PropTypes.string || PropTypes.instanceOf(Date) || PropTypes.null,
    date_attendance_string: PropTypes.string
  }),
};
export default WorkerDetails;