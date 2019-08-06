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

describe("BadRequest test", () => {
  it("Display an error for all path not specified", done => {
    supertest(app)
      .get("/dfezfezfezfezdza")
      .then(value => {
        expect(value.body).to.be.a("object");
        expect(value.body.message).to.equal("Path not found");
        expect(value.body.status).to.equal(404);

        done();
      })
      .catch(err => {
        process.stdout.write(`${err}`);
      });
  });
});
