import Cat from "../../src/db/model/Cat";
import { ICatModel } from "../../src/types/index";
import assert = require("assert");
// import * as chai from "chai";

// Chai
// const expect = chai.expect;

describe("Cat Class testing", () => {
  const myCatModel: Cat = new Cat();

  it("Cat class is typed", () => {
    const cat = myCatModel.getCatModel() as ICatModel;
    assert.equal(typeof cat, "object");
  });
});
