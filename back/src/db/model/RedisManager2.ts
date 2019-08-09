import { ICat, ICatModel } from '../../types/index';
import db from "../index";

export default class RedisManager {
  private db: any;

  constructor() {
    this.db = db;
  }

  // Manage Value of Key

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

  // Tab {`hash`, hash value: 'field1', 'keyFromField1', ...}

  public getHashValue(hash: string, callback?: (data: any) => void): boolean {
    return this.db.hgetall(hash, (err: any, object: any) => {
      this.rejectErr(err);

      // Success
      if (callback) {
        callback(object);
      }
    });
  }

  // Create an new Hash table

  public addANewHash(hash: string, collectionFieldValue: any): boolean {
    return this.db.hmset(hash, collectionFieldValue);
  }

  // RPUSH array

  public pushHashOnRedisArray(nameOfList: string, idOrArrayOfId: any): boolean {
    return this.db.rpush(
      [nameOfList, idOrArrayOfId],
      (err: any, nbOfKeyAdded: any) => {
        if (err) {
          throw new Error(`${err}`);
        }
        process.stdout.write(
          `\nSuccess you have ${nbOfKeyAdded} element in your array`
        );
      }
    );
  }

  // Manage Key Value

  public incrValueOfHashField(hash: string, fieldName: string): boolean {
    return this.db.hincrby(hash, fieldName, 1);
  }

  public decrValueOfHashField(
    uniqueIdOfElment: string,
    fieldName: string
  ): boolean {
    return this.db.hincrby(uniqueIdOfElment, fieldName, -1);
  }

  // SADD Members

  public registeredOnSadd(tags: string, arg: string, canRegiter: boolean): boolean {
    return canRegiter ?
    this.db.sadd(tags, arg, (err: any, reply: any) => {
      this.rejectErr(err);
      process.stdout.write(JSON.stringify(reply, null, 2));
    }) :
    false;
  }

  public getSmembers(tags: string, callback?: (tag: string) => void): boolean {
    return this.db.smembers(tags, (err: any, reply: any) => {
      this.rejectErr(err);
      if (callback) {
        callback(reply);
      }
    });
  }

  public addSaddMember(tags: string, arg: string): boolean {
    /*
    const success = this.exists(tags, (found: boolean) => {
      const registered = this.registeredOnSadd(tags, arg);
      return !found
        ? registered
        : this.acceptSetType(tags, arg, (isSetType: boolean) => {
          if(isSetType) {
            registered
          }
        });
    });*/
    const success = true;

    console.log(success, tags, arg);

    return success;
  }

  /************ Work on a generique Version ************/

  public workOnDataBaseVariable(
    ...args: [string, string, (arg: boolean) => void]
  ): boolean {
    const [type, id, cb] = args;

    const success = this.exists(id, (found: boolean) => {
      return !found ?
        cb(found) : // if is not found run cb
        this.acceptSetType(type, id, cb); // is found: reset or no
    });

    return success;
  }

  public acceptSetType(
    type: string,
    tag: string,
    callback?: (arg: boolean) => void
  ) {
    return this.type(tag, (typeOfTag: string): void => {
      if (typeOfTag === type) {
        if (callback) {
          callback(true);
          process.stdout.write("Request executed");
        }
      } else {
        if (callback) {
          callback(false);
        }
        process.stdout.write(
          "SADD not registred because tag is already define as a non-assignable type, please change tag\n"
        );
      }
    });
  }

  /*************** Generique version End ****************/

  // Manage Key Type

  public type(variable: string, callback?: (message: string) => void): boolean {
    return this.db.type(variable, (err: any, message: string): void => {
      this.rejectErr(err);
      this.isDefined(message, callback);
    });
  }

  // Manage assigned value

  public acceptOnlySetType(
    tag: string,
    arg: string,
    callback?: (tag: string, arg: string) => void
  ) {
    return this.type(tag, (typeOfTag: string): void => {
      if (typeOfTag === "set") {
        if (callback) {
          callback(tag, arg);
          process.stdout.write("Request executed");
        }
      } else {
        process.stdout.write(
          "SADD not registred because tag is already define as a non-assignable type, please change tag\n"
        );
      }
    });
  }

  // Manage Key availability

  public exists(
    variable: string,
    callback?: (response: boolean) => void
  ): boolean {

    return this.db.exists(variable, (error: any, message: string) => {
      this.rejectErr(error);
      this.isDefined(message, callback);
    });
  }

  // Work in progress

  public bulkInsertOfhash(
    model: ICatModel,
    object: ICat[]
  ) {
    // Constante
    const { idManager, catPrefix } = model;
    // Say if all the data is correctly recorded
    let isValide = this.exists(idManager);

    for (const key in object) {
      if (isValide) {
        isValide =
          this.incValueOfKey(`${catPrefix}`, async (err: any, id: any) => {
            this.rejectErr(err);

            const catId: string = `${catPrefix}:${id}`;

            // Try create hash and push it in an hash array
            try {
              await this.addANewHash(catId, object[key]);
              await this.addSaddMember(idManager, catId);
            } catch (err) {
              process.stdout.write(`\n${err}`);
            }
          }) && isValide;
      }
    }

    return isValide;
  }

  public bulkInsertOfhashv2(
    nameOfArrayId: string,
    idName: string,
    object: ICat[]
  ) {
    const isValide = true; // Say if all the data is correctly recorded
    this.addSaddMember(nameOfArrayId, `${idName}:150`);
    const multi = this.db.multi();

    for (const key in object) {
      if (isValide) {
        process.stdout.write(`${JSON.stringify(object[key])}`);
        this.incValueOfKey(`${idName}Id`, (err: any, id: any) => {
          this.rejectErr(err);

          multi.hmset(`${idName}:${id}`, object[key]);
          // process.stdout.write(`Bulk success ${idName}`);
        });
      }
    }

    return multi.exec((err: any, replies: any) => {
      if (err) {
        throw new Error(`${err}`);
      }

      process.stdout.write(`Bulk success ${replies}`);
    });
  }

  private isDefined(object: any, cb?: (object: any) => void) {
    if (cb) {
      cb(object);
    }
  }

  // Manage Error

  private rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }
}
