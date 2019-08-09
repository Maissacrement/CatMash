import { ICatModel } from '../../types/index';
// import RedisManager from "./RedisManager";

export default class Cat {
  private catModel: ICatModel;
  // private RedisManagerDb: RedisManager;

  constructor() {
    this.catModel = {
      idManager: "CatModel",
      catPrefix: "cat",
      type: "set",
      childType: "hash"
    };
    // this.RedisManagerDb = new RedisManager();
  }

  // GET METHODS

  public getCatModel(): ICatModel {
    return this.catModel;
  }

  public initDb() {
    // this.RedisManagerDb.addSaddMember(this.idManager, "init");
    /*
    this.RedisManagerDb.exists(this.idManager, (dbExist: boolean) => {
      if(!dbExist) {
        this.RedisManagerDb.registeredOnSadd(this.idManager, "init");
      }
    })*/
  }
}
