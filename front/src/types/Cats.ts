export interface ICat {
  image?: string;
  url?: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}

export interface ICatResponse {
  data: ICat;
  name: string;
}
