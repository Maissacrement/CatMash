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

  public bulkInsertOfhash(
    nameOfArrayId: string,
    idName: string,
    object: ICat[]
  ) {
    // Say if all the data is correctly recorded
    let isValide = this.exists(nameOfArrayId);

    for (const key in object) {
      if (isValide) {
        isValide =
          this.incValueOfKey(`${idName}`, async (err: any, id: any) => {
            this.rejectErr(err);

            // Try create hash and push it in an hash array
            try {
              await this.addANewHash(`${idName}:${id}`, object[key]);
              await this.addSaddMember(nameOfArrayId, `${idName}:${id}`);
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
  public registeredOnSadd(tags: string, arg: string): boolean {
    return this.db.sadd(tags, [arg], (err: any, reply: any) => {
      this.rejectErr(err);
      console.log(reply);
    });
  }

  public addSaddMember(tags: string, arg: string): boolean {
    const success = this.exists(tags, (err: any, found: boolean) => {
      this.rejectErr(err);

      return found
        ? this.registeredOnSadd(tags, arg)
        : this.acceptOnlySetType(tags, arg, this.registeredOnSadd);
    });

    return success;
  }

  // Test is variable is already assign
  public exists(
    variable: string,
    callback?: (error: any, message: boolean) => void
  ): boolean {
    return this.db.exists(variable, callback);
  }

  public type(variable: string, callback?: (message: string) => void): boolean {
    return this.db.type(variable, (err: any, message: string): void => {
      this.rejectErr(err);
      if (callback) {
        callback(message);
      }
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
          "SADD not registred because tag is already define, please change tag"
        );
      }
    });
  }

  // Manage Error

  private rejectErr(err: any): void {
    if (err) {
      throw new Error(`${err}`);
    }
  }
}
