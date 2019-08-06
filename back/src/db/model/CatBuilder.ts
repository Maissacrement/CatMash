import RedisManager from "./RedisManager";
interface ICat {
  image: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}

export default class CatBuilder {
  private RedisManagerDb: RedisManager;

  constructor(private queue: ICat[]) {
    this.RedisManagerDb = new RedisManager();
  }

  // Add ICat[] element in CatBuilder queue.
  public queuePush(arrayOfCats: ICat[]): void {
    this.queue = this.queue.concat(arrayOfCats);
  }

  // Push my queue element on redis, return `true` on success.
  public queuePushOnRedis(arrayOfId: string, idName: string) {
    return this.RedisManagerDb.bulkInsertOfhash(arrayOfId, idName, this.queue);
  }
}
