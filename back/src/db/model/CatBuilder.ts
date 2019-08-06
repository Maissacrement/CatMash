import RedisManager from "./RedisManager";
interface ICat {
  image: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}

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
    this.queue = [];

    return true;
  }

  // Push my queue element on redis, return `true` on success.
  public queuePushOnRedis(idManager: string, idName: string) {
    return this.RedisManagerDb.bulkInsertOfhash(idManager, idName, this.queue);
  }
}
