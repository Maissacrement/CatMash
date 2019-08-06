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

  public queuePush(arrayOfCats: ICat[]): void {
    this.queue = this.queue.concat(arrayOfCats);
  }

  // Push my queue element on redis
  public queuePushOnRedis(idName: string) {
    return this.RedisManagerDb.bulkInsertOfhash(idName, this.queue);
  }
}
