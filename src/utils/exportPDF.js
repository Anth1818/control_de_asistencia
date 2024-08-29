import { jsPDF } from "jspdf";

function handleExportPDF(date_start, date_end, departmentSelected, filterId, filteredAttendance, date) {
    const doc = new jsPDF();
    let heading = "";
if (filterId) {
  if (date_start === "" && date_end === "") {
    heading = `Reporte de asistencia del trabajador con cédula ${filterId}`;
  } else {
    heading = `Reporte de asistencia del trabajador con cédula ${filterId} del ${date_start} al\n ${date_end}`;
  }
} else {
  heading = `Reporte de asistencia generado el ${date} en el rango de fecha ${date_start === "" ? "--/--/----" : date_start} al ${date_end === "" ? "--/--/----" : date_end} en el departamento: ${departmentSelected?.name === undefined ? "'Todos los departamentos'" : departmentSelected?.name}`;
}

doc.setFontSize(16);
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const maxWidthHeading = pageWidth - 20; // Maximum width for the text (with some padding)

// Use the maxWidth option to ensure the text wraps if it doesn't fit in the specified width
doc.text(heading, 10, 10, { maxWidth: maxWidthHeading });

    doc.setFontSize(10);
    // Add filtered attendance data
    let startY = 30;
    const gap = 15;
    const maxWidth = pageWidth - 20// Starting Y position for the attendance data
    filteredAttendance.forEach((record, index) => {
      const recordText = `${index + 1}. Cédula: ${record.identity_card} - Nombre Completo: ${record.full_name} - Fecha: ${record.date_attendance_string} - Hora de entrada: ${record.check_in_string} - Hora de salida: ${record.check_out_string} - Departamento: ${record.department}`;
      
      // Check if the current Y position exceeds the page height
      if (startY + gap > pageHeight) {
        doc.addPage();
        startY = 10; // Reset Y position for the new page
      }
  
      doc.text(recordText, 10, startY, { maxWidth });
      startY += gap; // Increment Y position for the next record
    });
  
    doc.save(`Reporte_de_asistencia.pdf`);
  }

  export default handleExportPDF;