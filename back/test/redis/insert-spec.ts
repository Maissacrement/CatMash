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
    idAtelierApi: "string",
    image: "string",
    like: 0
  },
  {
    actif: true,
    idAtelierApi: "string2",
    image: "string2",
    like: 0
  }
];

describe("Insert data on Redis module testing ...", () => {
  const Redis = new RedisManager();

  it("should be all data", () => {
    const execBulk = Redis.bulkInsertOfhash("catmash", object);

    assert.equal(execBulk, true);
  });
});
