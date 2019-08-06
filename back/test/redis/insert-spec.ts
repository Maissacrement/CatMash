import assert = require("assert");
import RedisManager from "../../src/db/model/RedisManager";

interface ICat {
  image: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}

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
    const execBulk = Redis.bulkInsertOfhash("cato", "catmash", object);

    assert.equal(execBulk, true);
  });
});
