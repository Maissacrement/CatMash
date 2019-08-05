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

  public createCat(catId: number): boolean {
    const cat = this.get();

    return db.hmset(
      `cat:${catId}`, // Cat Id
      "image",
      cat.image, // ImageUrl
      "idAtelierApi",
      cat.idAtelierApi, // Id of cat in latelier.co
      "actif",
      `${cat.actif}`, // Is always available in `latelier.co`
      "like",
      `${cat.like}` // Number of like
    );
  }

  public addCatOnRedis(): boolean {
    const createCatState = (newCat: any) => this.createCat(newCat);
    let created: boolean = false;

    const addNewCat = (err: any, catId: number) => {
      if (err) {
        throw new Error(`${err}`);
      }

      // Recover state after execution of the function
      const exec: boolean = createCatState(catId);

      // Create cat
      if (exec) {
        // Cat is registered
        process.stdout.write("Cat has been create successfully!");
      } else {
        // Cat reject
        process.stdout.write("Cat not registered");
      }
    };

    // if err throw
    created = db.incr("catId", addNewCat);

    return created;
  }

  public toString(): string {
    return `Bonjour, l'id de votre chat est le :
      ${this.idAtelierApi}! Son url: ${this.image}!
      ${this.like}, ${this.actif}`;
  }
}
