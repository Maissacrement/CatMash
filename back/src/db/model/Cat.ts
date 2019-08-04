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

  public addCatOnRedisDb(): void {
    const elementToInsert = this.get();
    process.stdout.write(JSON.stringify(elementToInsert, null, 2));

    db.hmset(
      ["key2", "test keys 1", "test val 1", "test keys 2", "test val 2"],
      function(err, res) {
        if (err) {
          throw new Error(`${err}`);
        }
        console.log(res);
      }
    );
  }

  public toString(): string {
    return `Bonjour, l'id de votre chat est le :
      ${this.idAtelierApi}! Son url: ${this.image}!
      ${this.like}, ${this.actif}`;
  }
}
