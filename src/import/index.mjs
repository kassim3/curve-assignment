import * as path from "path";
import xlsx from "node-xlsx";
import { fileURLToPath } from "url";

export const runImport = async () => {
  const data = getDataFromFile("track_import_test.xlsx");

  console.log(data);
};

const getDataFromFile = (file, rowStart = 2) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const [sheet] = xlsx.parse(path.join(__dirname, `../../data/${file}`));

  return sheet.data.splice(rowStart);
};
