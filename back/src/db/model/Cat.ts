interface CatArgs {
  image: string;
  idAtelierApi: string;
}

export class Cat {
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

  public toString(): string {
    return `Bonjour, l'id de votre chat est le :
      ${this.idAtelierApi}! Son url: ${this.image}!
      ${this.like}, ${this.actif}`;
  }
}
