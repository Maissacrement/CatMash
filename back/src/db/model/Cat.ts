import db from "../index";

// Interface
interface CatArgs {
  image: string;
  idAtelierApi: string;
}

interface CatFull extends CatArgs {
  actif: boolean;
  like: number;
}

export default class Cat {
  private image: string;
  private idAtelierApi: string;
  private actif: boolean;
  private like: number;

  constructor(cat: CatArgs) {
    this.image = cat.image;
    this.idAtelierApi = cat.idAtelierApi;

    this.actif = true;
    this.like = 0;
  }

  public get(): CatFull {
    return {
      image: this.image,
      actif: this.actif,
      idAtelierApi: this.idAtelierApi,
      like: this.like
    };
  }

  public getCat(catId: string): boolean {
    return db.hgetall(catId, (err, object) => {
      // if error throw error
      this.rejectErr(err);

      // Success
      console.log(object);
    });
  }

  public getCatId(id: string): boolean {
    return db.get(id, (err, reply) => {
      // if error throw error
      this.rejectErr(err);

      // Success
      console.log(reply);
    });
  }

  public createCat(catId: number): boolean {
    const cat = this.get();

    return db.hmset(`cat:${catId}`, {
      image: cat.image, // ImageUrl
      idAtelierApi: cat.idAtelierApi, // Id of cat in latelier.co
      actif: `${cat.actif}`, // Is always available in `latelier.co`
      like: `${cat.like}` // Number of like
    });
  }

  private addNewCat() {
    return (err: any, catId: number) => {
      // if error throw error
      this.rejectErr(err);

      // Success
      
      // Recover state after execution of the function
      const exec: boolean = this.createCat(catId);

      // Create cat
      if (exec) {
        // Cat is registered
        process.stdout.write("Cat has been create successfully!");
      } else {
        // Cat reject
        process.stdout.write("Cat not registered");
      }
    };
  }

  public addCatOnRedis(): boolean {
    let created: boolean = false;

    // Create a new cat on success
    created = db.incr("catId", this.addNewCat);

    return created;
  }

  private rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }
}
