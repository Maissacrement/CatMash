import Cat from "../../src/db/model/Cat";

describe("Vote API module testing ...", function() {
  describe("addCat", function() {
    const cat0 = new Cat({
      image: "this.image",
      idAtelierApi: "this.idAtelierApi"
    });

    it("should return 1 if the cat is added successfully", function() {
      process.stdout.write(JSON.stringify(cat0, null, 2));
    });
  });
});
