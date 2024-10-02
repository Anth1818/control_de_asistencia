import { jsPDF } from "jspdf";
import inamujerLogo from "../../public/inamujer-logo.png";
import cintilloInamujer from "../../public/cintillo_ministerio.png";
import autoTable from 'jspdf-autotable';

function toBase64(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(this, 0, 0);
      resolve(canvas.toDataURL("image/png").split(",")[1]);
    };
    image.src = url;
  });
}

let inamujerLogoBase64;
let cintilloInamujerBase64;

async function loadImages() {
  inamujerLogoBase64 = await toBase64(inamujerLogo);
  cintilloInamujerBase64 = await toBase64(cintilloInamujer);
} 

loadImages();

function handleExportPDF(
  date_start,
  date_end,
  departmentSelected,
  filterId,
  filteredAttendance,
  date
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidthHeading = pageWidth - 20; // Maximum width for the text (with some padding)
  const title = "Reporte de asistencia";
  const generateReport = `Generado el: ${date}`;
  const dateRange = `En rango de fecha ${date_start ? date_start : "No especificado"} al ${date_end ? date_end : "No especificado"}`;
  const department = `Departamento: ${departmentSelected?.name ? departmentSelected?.name : "Todos los departamentos"}`;
  const filter = `Cédula: ${filterId ? filterId : "No especificado"}`;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  
  doc.text(title, 20, 35, { maxWidth: maxWidthHeading });
  doc.addImage(cintilloInamujerBase64, "PNG", 0, 0, 210, 25);
  doc.addImage(inamujerLogoBase64, "PNG", 0, 25, 20, 20);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");


  // Use the maxWidth option to ensure the text wraps if it doesn't fit in the specified width
  doc.text(generateReport, 20, 45, { maxWidth: maxWidthHeading });
  doc.text(dateRange, 20, 55, { maxWidth: maxWidthHeading });
  doc.text(department, 20, 65, { maxWidth: maxWidthHeading });
  doc.text(filter, 20, 75, { maxWidth: maxWidthHeading });

  // Define the columns
  const columns = [
    "#",
    "Cédula",
    "Nombre Completo",
    "Fecha",
    "Hora de entrada",
    "Hora de salida",
    "Departamento",
  ];

  // Prepare the data
  const data = filteredAttendance.map((record, index) => [
    index + 1,
    record.identity_card,
    record.full_name,
    record.date_attendance_string,
    record.check_in_string,
    record.check_out_string,
    record.department,
  ]);

  // Add the table to the PDF
  doc.autoTable({
    head: [columns],
    body: data,
    startY: 85,
    styles: { fontSize: 10 },
  });

  const blob = new Blob([doc.output("blob")], { type: "application/pdf" });

  // Create a URL from the blob
  const url = URL.createObjectURL(blob);

  // Open the URL in a new tab
  window.open(url, "_blank");
}

export default handleExportPDF;
