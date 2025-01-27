import * as XLSX from "xlsx";

export const downloadExcel = (data, fileName = "resultados.xlsx") => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultados");
    XLSX.writeFile(wb, fileName);
};
