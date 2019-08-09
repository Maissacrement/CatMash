import assert = require("assert");
import RedisManager from "../../src/db/model/RedisManager";
import { ICat } from "../../src/types/index";
import Cat from "../../src/db/model/Cat";

const myCatModel: Cat = new Cat();

const object: ICat[] = [
  {
    actif: true,
    idAtelierApi: "string3",
    image: "string",
    like: 0
  },
  {
    actif: true,
    idAtelierApi: "string64",
    image: "string2",
    like: 0
  }
];

describe("Insert data on Redis module testing ...", () => {
  const Redis = new RedisManager();

  it("should be return true if bulk is a success", () => {
    const execBulk = Redis.bulkInsertOfhash(myCatModel.getCatModel(), object);

    assert.equal(execBulk, true);
  });

  it("return true if sadd member is created", () => {
    const addSadd = Redis.addSaddMember("mycatlisttr2", "catmash", "set");
    assert.equal(typeof addSadd, "boolean");
  });

  it("set undefined variable and reassign variable with 'set' type", () => {
    const test = () => true;
    const typeFunction = Redis.workOnDataBaseVariable(
      "mycatlisttr2",
      "catmash",
      test
    );

    assert.equal(typeof typeFunction, "boolean");
  });
});
