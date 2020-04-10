export type Ttype = "set";
export type TChildType = "hash";
export type actif = false;
export type like = 0;

export interface ICatModel {
  idManager: string;
  catPrefix: string;
  type: Ttype;
  childType: TChildType;
}

export interface ICat {
  url: string;
  id: string;
  actif: boolean;
  like: number;
}

export interface ICatInit extends ICat {
  actif: actif;
  like: like;
}

export interface ICatFormatNoStatic {
  image: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}

export interface ICatFormat extends ICatFormatNoStatic {
  actif: actif;
  like: like;
}

export interface lAtelier {
  id: string;
  url: string;
}

export interface IJsonCatFormat {
  name: string;
  data: ICat;
}
