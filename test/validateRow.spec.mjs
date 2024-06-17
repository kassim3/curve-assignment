import { expect } from "chai";
import sinon from "sinon";
import { validateRow } from "../src/import/index.mjs";

const contract1 = { name: "Contract 1" };
const track = {
  title: "Track1",
  ISRC: "ISRC 1",
  contractName: contract1.name,
};

describe("validateRow - when contract does not exist for the given contract name", function () {
  let errors = [];
  before(function () {
    errors = validateRow(track, null);
  });

  it("have only 1 error and state that the contract was not found", function () {
    expect(errors.length).to.equal(1);
    expect(errors[0]).to.equal("Contract could not be found");
  });
});

describe("validateRow - when contract does exist for the given contract name", function () {
  let errors = [];
  before(function () {
    errors = validateRow(track, contract1);
  });

  it("have no errors", function () {
    expect(errors.length).to.equal(0);
  });
});

describe("validateRow - title, ISRC is missing and contract not found", function () {
  let errors = [];
  before(function () {
    errors = validateRow({ contractName: contract1.name }, null);
  });

  it("have 3 errors each specifying what was missing", function () {
    expect(errors.length).to.equal(3);
    expect(errors.includes("title is not set")).to.equal(true);
    expect(errors.includes("ISRC is not set")).to.equal(true);
    expect(errors.includes("Contract could not be found")).to.equal(true);
  });
});
