import xlsx from "node-xlsx";
import { expect } from "chai";
import sinon from "sinon";

import { getDataFromFile } from "../src/import/index.mjs";

describe("getDataFromFile - extract data from third row", function () {
  let data;
  let sinonSandbox;

  before(function () {
    sinonSandbox = sinon.createSandbox();
    sinonSandbox.stub(xlsx, "parse").returns([
      {
        name: "Sheet1",
        data: [
          ["row1", "row1", "row1"],
          ["row2", "row2", "row2"],
          ["row3", "row3", "row3"],
          ["row4", "row4", "row4"],
        ],
      },
    ]);
    data = getDataFromFile("./test/getDataFromFile.xlsx");
  });

  after(function () {
    sinonSandbox.restore();
  });

  it("Result should be an array", function () {
    expect(data).to.be.a("array");
  });

  it("The first element should be from the third row", function () {
    const [firstElement] = data;
    expect(firstElement).to.be.a("array");
    expect(firstElement[0]).to.equal("row3");
  });
});

describe("getDataFromFile - extract data from second row", function () {
  let data;
  let sinonSandbox;

  before(function () {
    sinonSandbox = sinon.createSandbox();
    sinonSandbox.stub(xlsx, "parse").returns([
      {
        name: "Sheet1",
        data: [
          ["row1", "row1", "row1"],
          ["row2", "row2", "row2"],
          ["row3", "row3", "row3"],
          ["row4", "row4", "row4"],
        ],
      },
    ]);
    data = getDataFromFile("./test/getDataFromFile.xlsx", 1);
  });

  after(function () {
    sinonSandbox.restore();
  });

  it("Result should be an array", function () {
    expect(data).to.be.a("array");
  });

  it("The first element should be from the second row", function () {
    const [firstElement] = data;

    expect(firstElement).to.be.a("array");
    expect(firstElement[0]).to.equal("row2");
  });
});
