import { ICatModel, ICatFormat, ICatFormatNoStatic, lAtelier } from "../../types/index";
import RedisManager from "./RedisManager";

export default class CatBuilder {
  private RedisManagerDb: RedisManager;
  private queue: ICatFormatNoStatic[];

  constructor() {
    this.queue = [];
    this.RedisManagerDb = new RedisManager();
  }

  // Add ICat[] element in CatBuilder queue.
  public queuePush(arrayOfCats: ICatFormatNoStatic[]): void {
    this.queue = this.queue.concat(arrayOfCats);
  }

  public emptyQueue() {
    this.queue = [] as ICatFormatNoStatic[];
    return true;
  }

  // Push my queue element on redis, return `true` on success.
  public queuePushOnRedis(model: ICatModel) {
    return this.RedisManagerDb.bulkInsertOfhash(model, this.queue)
      ? this.emptyQueue()
      : null;
  }

  public getCatById(catId: string, callback?: (data: any) => void): boolean {
    return this.RedisManagerDb.getHashValue(catId, callback);
  }

  public getCatListLength(id: string, callback?: (data: any) => void): boolean {
    return this.RedisManagerDb.getValueOfKey(id, callback);
  }

  public getListOfCat(
    tagName: string,
    callback?: (data: any) => void
  ): boolean {
    return this.RedisManagerDb.getSmembers(tagName, callback);
  }

  public getCatsByHash(hash: string, cb: (data: any) => void) {
    this.RedisManagerDb.getHashValue(hash, cb);
  }

  public incLike(cat: string): boolean {
    return this.RedisManagerDb.incrValueOfHashField(`${cat}`, "like");
  }

  public decrLike(cat: string): boolean {
    return this.RedisManagerDb.decrValueOfHashField(`${cat}`, "like");
  }

  public exist(redisKey: string, callback?: (data: boolean) => void): boolean {
    return this.RedisManagerDb.exists(`${redisKey}`, callback);
  }

  public isEditableVariable(
    type: string,
    newIdToadded: string,
    callback: (exist: boolean) => void
  ): boolean {
    return this.RedisManagerDb.workOnDataBaseVariable(
      type,
      `${newIdToadded}`,
      callback
    );
  }

  // Format to Cats
  public formatCat(cats: lAtelier[]): Promise<ICatFormatNoStatic[]> {
    return new Promise((resolve: any, reject: any) => {
      let listOfCat: ICatFormatNoStatic[] = [];

      cats.forEach((datas: any) => {
        listOfCat.push(this.parseToCatsModel(datas));
      });

      if(listOfCat.length > 0) {
        resolve(listOfCat);
      }
      reject("Error no cats found");
    });
  }

  // object to Cats Model format
  private parseToCatsModel(data: lAtelier): ICatFormat {
    return {
      image: data.url,
      idAtelierApi: data.id,
      actif: false,
      like: 0,
    }
  }
}
