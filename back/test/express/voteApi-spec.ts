import Cat from "../../src/db/model/Cat";
import assert = require("assert");

describe("Vote API module testing ...", () => {
  describe("addCat", () => {
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

    it("should return 1 if the cat is added successfully", () => {
      assert.equal(cat0.addCatOnRedis(), true);
    });

    it("should return 1 if catId is define", () => {
      assert.equal(cat0.getCatId("catId"), true);
    });

    it("should return 1 if the cat is found", () => {
      assert.equal(cat0.getCat("cat:1"), true);
    });
  });
});
