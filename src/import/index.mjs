import * as path from "path";
import xlsx from "node-xlsx";
import { fileURLToPath } from "url";
import { Contract } from "../models/Contract.mjs";
import { Track } from "../models/Track.mjs";

export const runImport = async () => {
  const rowStart = 2;

  const data = getDataFromFile("data/track_import_test.xlsx", rowStart);
  const contractNames = [...new Set(data.map((data) => data[7]))];

  const contracts = await Contract.find({ name: { $in: contractNames } });

  const errors = [];

  await Promise.all(
    data.map(
      async (
        [id, title, version, artist, ISRC, pLine, aliases, contractName],
        index
      ) => {
        const lineNumber = index + rowStart + 1;

        const contract = contractName
          ? contracts.find(({ name }) => name === contractName)
          : null;

        const validationErrors = validateRow(
          { title, ISRC, contractName },
          contract
        );

        if (validationErrors.length)
          errors.push({ lineNumber, errors: validationErrors });

        if (errors.length) return;

        return Track.create({
          id,
          title,
          version,
          artist,
          ISRC,
          pLine,
          aliases: aliases.split(";").map((alias) => alias.trim()),
          contractID: contract._id,
        });
      }
    )
  );

  console.log(errors);
  return errors;
};

export const validateRow = ({ title, ISRC, contractName }, contract) => {
  const errors = [];

  if (!title) errors.push("title is not set");
  if (!ISRC) errors.push("ISRC is not set");
  if (contractName && !contract) errors.push("Contract could not be found");

  return errors;
};

export const getDataFromFile = (file, rowStart = 2) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const [sheet] = xlsx.parse(path.join(__dirname, `../../${file}`));

  return sheet.data.splice(rowStart);
};
