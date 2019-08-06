import assert = require("assert");
import db from "../../src/db/index";

describe("Redis API module testing ...", () => {
  describe("Redis", () => {
    it("should return true if connection is a success", () => {
      const stateOfPingOnRedis = (): boolean => {
        return db.ping((err, message) => {
          if (err) {
            throw new Error(`${err}`);
          }

          // require pong response
          assert.equal("PONG", message);
        });
      };

      // Ping
      assert.equal(true, stateOfPingOnRedis());
    });
  });
});
