import db from "../index";

export default class RedisManager {
  private db: any;

  constructor() {
    this.db = db;
  }

  // Key: Value

  // Inc a key start on 0 is nb is undefined
  incValueOfKey(idVariableToIncrement: string, callback: Function): boolean {
    return this.db.incr(idVariableToIncrement, callback);
  }

  public getKeyById(keyId: string, callback?: Function): boolean {
    return this.db.get(keyId, (err: any, reply: any) => {
      // if error throw error
      this.rejectErr(err);

      // Success
      if (callback) {
        callback(reply);
      }
    });
  }

  // Tab {`masterId`, 'field1', 'keyFromField1', ...}

  public getElementByTableId(id: string, callback?: Function): boolean {
    return this.db.hgetall(id, (err: any, object: any) => {
      this.rejectErr(err);

      // Success
      if (callback) {
        callback(object);
      }
    });
  }

  addTable(uniqueIdOfElment: string, objectAssociateToElement: any): boolean {
    return this.db.hmset(uniqueIdOfElment, objectAssociateToElement);
  }

  incValueOfTabKey(uniqueIdOfElment: string, fieldName: string): boolean {
    return this.db.hincrby(uniqueIdOfElment, fieldName, 1);
  }

  // Manage Error

  private rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }

}
