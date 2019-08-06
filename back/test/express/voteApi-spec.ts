import assert = require("assert");
import * as chai from "chai";
import Cat from "../../src/db/model/Cat";

// Chai
const expect = chai.expect;

describe("Vote API module testing ...", () => {
  describe("addCat", () => {
    const cat0 = new Cat({
      idAtelierApi: "this.idAtelierApi",
      image: "this.image"
    });

    it("declare variable", () => {
      assert.equal(cat0.get().image, "this.image");
      assert.equal(cat0.get().idAtelierApi, "this.idAtelierApi");

      // private const value
      assert.equal(cat0.get().actif, true);
      assert.equal(cat0.get().like, 0);
    });

    it("should return 1 if the cat is added successfully", () => {
      assert.equal(cat0.addCatOnRedis(), true);
    });

    it("should return 1 if catId is define", () => {
      assert.equal(cat0.getCatId("catId"), true);
      cat0.getCatId("catId", (data: string) => {
        // process.stdout.write(JSON.stringify(data, null, 2));
        const id = parseInt(data, 10) || null;
        expect(id).to.be.a("number");
      });
    });

    it("should return 1 if the cat like has been incremented", () => {
      assert.equal(cat0.incLike(1), true);
    });

    it("should return 1 if the cat is found", () => {
      assert.equal(cat0.getCat("cat:1"), true);
      cat0.getCat("cat:1", (data: any) => {
        // process.stdout.write(JSON.stringify(data, null, 2));
        expect(data).to.be.a("object");
      });
    });
  });
});
