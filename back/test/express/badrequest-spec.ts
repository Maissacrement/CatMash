// External Module Load
//import BadRequest from "../src/routes/endpoints/badRequest";
import router from "../../src/routes/index";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import * as supertest from "supertest";
import express = require("express");

// Express
const app: express.Application = express();
app.use(router);

// Chai
const expect = chai.expect;
// let should = chai.should();
chai.use(chaiHttp);

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
        console.log(`${err}`);
      });
  });
});
