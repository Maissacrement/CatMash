import RedisManager from "./RedisManager";

// Interface
interface ICatArgs {
  image: string;
  idAtelierApi: string;
}

interface ICatFull extends ICatArgs {
  actif: boolean;
  like: number;
  id: string;
}

export default class Cat {
  private image: string;
  private idAtelierApi: string;
  private actif: boolean;
  private like: number;
  private id: string;
  private RedisManagerDb: RedisManager;

  constructor(cat: ICatArgs) {
    this.image = cat.image;
    this.idAtelierApi = cat.idAtelierApi;

    this.actif = true;
    this.like = 0;
    this.id = "";
    this.RedisManagerDb = new RedisManager();
  }

  public setId(id: string): void {
    this.id = id;
  }

  public get(): ICatFull {
    return {
      actif: this.actif,
      id: this.id,
      idAtelierApi: this.idAtelierApi,
      image: this.image,
      like: this.like
    };
  }

  public currentId(): string {
    return this.id;
  }

  public getCat(catId: string, callback?: (data: any) => void): boolean {
    return this.RedisManagerDb.getHashValue(catId, callback);
  }

  public getCatId(id: string, callback?: (data: any) => void): boolean {
    return this.RedisManagerDb.getValueOfKey(id, callback);
  }

  public incLike(catId: number): boolean {
    return this.RedisManagerDb.incrValueOfHashField(`cat:${catId}`, "like");
  }

  public createCat(catId: number): boolean {
    const cat = this.get();
    const catCompleteId = `cat:${catId}`;
    const myCat = {
      actif: `${cat.actif}`, // Is always available in `latelier.co`
      idAtelierApi: cat.idAtelierApi, // Id of cat in latelier.co
      image: cat.image, // ImageUrl
      like: `${cat.like}` // Number of like
    };

    return this.RedisManagerDb.addANewHash(catCompleteId, myCat);
  }

  public addNewCat(callback?: (catId: number) => void) {
    return async (err: any, catId: number) => {
      // if error throw error
      this.rejectErr(err);
      if (!catId) {
        throw new Error("Cat id is undefined");
      }

      // Success
      // Recover state after execution of the function
      const exec: boolean = this.createCat(catId);

      // test is fonction is execute
      if (!exec) {
        throw new Error("Methods createCat not return true");
      }

      // On success execute or not a callback
      if (callback) {
        callback(catId);
      }
    };
  }

  public addCatOnRedis(callback?: (id: number) => void): boolean {
    let created: boolean = false;

    // Create a new cat on success
    created = this.RedisManagerDb.incValueOfKey(
      "catId",
      this.addNewCat(callback)
    );

    return created;
  }

  public rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }
}
