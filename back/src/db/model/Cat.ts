import RedisManager from "./RedisManager";

// Interface
interface CatArgs {
  image: string;
  idAtelierApi: string;
}

interface CatFull extends CatArgs {
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

  constructor(cat: CatArgs) {
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

  public get(): CatFull {
    return {
      image: this.image,
      actif: this.actif,
      idAtelierApi: this.idAtelierApi,
      like: this.like,
      id: this.id
    };
  }

  public getCat(catId: string, callback?: Function): boolean {
    return this.RedisManagerDb.getElementByTableId(catId, callback);
  }

  public getCatId(id: string, callback?: Function): boolean {
    return this.RedisManagerDb.getValueByKeyId(id, callback);
  }

  public incLike(catId: number): boolean {
    return this.RedisManagerDb.incValueOfTableKey(`cat:${catId}`, "like");
  }

  public createCat(catId: number): boolean {
    const cat = this.get();
    const catCompleteId = `cat:${catId}`;
    this.setId(catCompleteId);
    const myCat = {
      image: cat.image, // ImageUrl
      idAtelierApi: cat.idAtelierApi, // Id of cat in latelier.co
      actif: `${cat.actif}`, // Is always available in `latelier.co`
      like: `${cat.like}` // Number of like
    };

    return this.RedisManagerDb.addTable(catCompleteId, myCat);
  }

  public addNewCat() {
    return (err: any, catId: number) => {
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
    };
  }

  public addCatOnRedis(): boolean {
    let created: boolean = false;

    // Create a new cat on success
    created = this.RedisManagerDb.incValueOfKey("catId", this.addNewCat());
    console.log(this.get());

    return created;
  }

  private rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }
}
