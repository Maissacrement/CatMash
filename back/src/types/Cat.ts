export type Ttype = "set";
export type TChildType = "hash";

export interface ICatModel {
  idManager: string;
  catPrefix: string;
  type?: Ttype;
  childType?: TChildType;
}

export interface ICat {
  image: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}
