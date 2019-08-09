import { ICatModel } from "../../types/index";
import Catbuilder from "./CatBuilder";

export default class Cat {
  private catModel: ICatModel;
  private catbuilder: Catbuilder;

  constructor() {
    this.catbuilder = new Catbuilder();
    this.catModel = {
      catPrefix: "cat",
      childType: "hash",
      idManager: "CatModel",
      type: "set"
    };
  }

  // GET METHODS

  public getCatModel(): ICatModel {
    return this.catModel;
  }

  public getCats(cb?: (catsList: string[]) => void) {
    return this.catbuilder.getListOfCat(this.catModel.idManager, cb);
  }
}
