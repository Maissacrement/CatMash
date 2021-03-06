// External Module Load
import * as chai from "chai";
import express = require("express");
import * as supertest from "supertest";
import router from "../../src/routes/index";

// Express
const app: express.Application = express();
app.use(router);

// Chai
const expect = chai.expect;
const assert = require("chai").assert;

describe("Vote API test", () => {
  it("Error to send vote cat undefined", (done) => {
    supertest(app)
      .get("/like?choice=like")
      .then((value) => {
        expect(value.body.message).to.be.equal("Cat is undefined");
        assert.equal(typeof value.body.status, "number");

        done();
      })
      .catch((err) => {
        process.stdout.write(`${err}`);
        done();
      });
  });
});
