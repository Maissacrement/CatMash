import { ICatModel } from '../../types/index';

export default class Cat {
  private name: string;
  private catPrefix: string;

  constructor() {
    this.name = "CatModel";
    this.catPrefix = "cat";
  }

  // GET METHODS

  public getCatModel(): ICatModel {
    return {
      name: this.name,
      catPrefix: this.catPrefix
    }
  }
}
