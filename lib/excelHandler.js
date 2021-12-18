import xlsx from "node-xlsx";

export function parseExcelFile(path) {
  return xlsx.parse(path);
}
