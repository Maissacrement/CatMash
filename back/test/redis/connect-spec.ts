import db from "../../src/db/index";
import assert = require("assert");

describe("Vote API", function() {
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
