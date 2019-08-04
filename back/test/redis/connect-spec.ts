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
  describe("addCat", function() {
    it("should return 1 if the cat is added successfully", function() {
      assert.equal(
        1,
        db.hmset(
          ["key2", "test keys 1", "test val 1", "test keys 2", 2],
          function(err, res) {
            if (err) {
              throw new Error(`${err}`);
            }
            console.log(res);
          }
        )
      );
    });
  });
});
