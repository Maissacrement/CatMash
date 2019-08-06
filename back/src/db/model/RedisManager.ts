import db from "../index";

interface ICat {
  image: string;
  idAtelierApi: string;
  actif: boolean;
  like: number;
}

export default class RedisManager {
  private db: any;

  constructor() {
    this.db = db;
  }

  // Key: Value

  // Inc a key start on 0 is nb is undefined
  public incValueOfKey(
    key: string,
    callback?: (err: any, id: any) => void
  ): boolean {
    return this.db.incr(key, callback);
  }

  public decrValueOfKey(key: string, callback?: (data: any) => void): boolean {
    return this.db.decr(key, callback);
  }

  public getValueOfKey(key: string, callback?: (reply: any) => void): boolean {
    return this.db.get(key, (err: any, reply: any) => {
      // if error throw error
      this.rejectErr(err);

      // Success : "Value"
      if (callback) {
        callback(reply);
      }
    });
  }

  // Tab {`hash`, 'field1', 'keyFromField1', ...}

  public getIdByHash(hash: string, callback?: (data: any) => void): boolean {
    return this.db.hgetall(hash, (err: any, object: any) => {
      this.rejectErr(err);

      // Success
      if (callback) {
        callback(object);
      }
    });
  }

  public addANewHash(hash: string, collectionFieldValue: any): boolean {
    return this.db.hmset(hash, collectionFieldValue);
  }

  public bulkInsertOfhash(idName: string, object: ICat[]) {
    let isValide = true; // Say if all the data is correctly recorded
    for (const key in object) {
      if (isValide) {
        isValide =
          this.incValueOfKey(`${idName}`, async (err: any, id: any) => {
            this.rejectErr(err);
            await this.addANewHash(`${idName}:${id}`, object[key]);
          }) && isValide;
      }
    }

    return isValide;
  }

  public incrValueOfHashField(hash: string, fieldName: string): boolean {
    return this.db.hincrby(hash, fieldName, 1);
  }

  public decrValueOfHashField(
    uniqueIdOfElment: string,
    fieldName: string
  ): boolean {
    return this.db.hincrby(uniqueIdOfElment, fieldName, -1);
  }

  // Manage Error

  private rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }
}
