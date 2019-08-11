import { ICatModel, IJsonCatFormat } from "../../types/index";
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

  public getCats() {
    const myCats: IJsonCatFormat[] = [];

    return new Promise((res: any, rej: any) => {
      this.getIdOfAllCats((cats: string[]) => {
        if(cats.length === 0) {
          rej('No SADD Members, Cat is undefined')
        }

        cats.forEach((catHash: string, index: number) => {
          this.catbuilder.getCatsByHash(catHash, (data: any) => {
            if(!data){
              rej('Error to read data')
            }

            myCats.push(this.format(catHash, data));
            if (index === cats.length - 1) {
              res(myCats);
            }
          });
        });
      });
    })
  }

  private format(nameOfCat: string, response: any) {
    return {
      data: response,
      name: nameOfCat
    };
  };

  private getIdOfAllCats(cb?: (catsList: string[]) => void) {
    return this.catbuilder.getListOfCat(this.catModel.idManager, cb);
  }
}
