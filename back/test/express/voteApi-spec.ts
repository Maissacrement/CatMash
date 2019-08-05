import Cat from "../../src/db/model/Cat";
import assert = require("assert");

describe("Vote API module testing ...", function() {
  describe("addCat", function() {
    const cat0 = new Cat({
      image: "this.image",
      idAtelierApi: "this.idAtelierApi"
    });

    it("declare variable", () => {
      assert.equal(cat0.get().image, "this.image");
      assert.equal(cat0.get().idAtelierApi, "this.idAtelierApi");

      //private const value
      assert.equal(cat0.get().actif, true);
      assert.equal(cat0.get().like, 0);
    });

    it("should return 1 if the cat is added successfully", function() {
      assert.equal(cat0.addCatOnRedis(), true);
    });
  });
});
