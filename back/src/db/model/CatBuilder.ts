import RedisManager from "./RedisManager";
import { ICat } from '../../types/index';

export default class CatBuilder {
  private RedisManagerDb: RedisManager;
  private queue: ICat[];

  constructor() {
    this.queue = [];
    this.RedisManagerDb = new RedisManager();
  }

  // Add ICat[] element in CatBuilder queue.
  public queuePush(arrayOfCats: ICat[]): void {
    this.queue = this.queue.concat(arrayOfCats);
  }

  public emptyQueue() {
    this.queue = [] as ICat[];
    return true;
  }

  // Push my queue element on redis, return `true` on success.
  public queuePushOnRedis(aCat: any) {
    const { idManager, idName } = aCat.getCatModel();
    return this.RedisManagerDb.bulkInsertOfhash(idManager, idName, this.queue)
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
    return this.RedisManagerDb.tryRunTypeCallback(
      type,
      `${newIdToadded}`,
      callback
    );
  }
}
