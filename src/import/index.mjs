import * as path from "path";
import xlsx from "node-xlsx";
import { fileURLToPath } from "url";

export const runImport = async () => {
  const data = getDataFromFile("data/track_import_test.xlsx");

  console.log(data);
};

export const getDataFromFile = (file, rowStart = 2) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const [sheet] = xlsx.parse(path.join(__dirname, `../../${file}`));

  return sheet.data.splice(rowStart);
};
