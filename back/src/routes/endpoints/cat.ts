import Cat from "../../db/model/Cat";
import CatBuilder from "../../db/model/CatBuilder";

const catBuilder: CatBuilder = new CatBuilder();

const addCatOnDb = (_: any, res: any) => {
  const newCat = new Cat({
    idAtelierApi: "26",
    image: "http://myimg.png"
  });

  const isCreate = newCat.addCatOnRedis((id: number) =>
    process.stdout.write(`${id}`)
  );

  if (isCreate) {
    res.status(200).json({ message: "User create successfully", status: 200 });
  } else {
    res.status(403).json({ message: "User is not create", status: 403 });
  }
};

const insertCat = (req: any, res: any) => {
  const cats = req.body; // as ICat
  const catBuilder = new CatBuilder();

  // Add cat on queue builder
  catBuilder.queuePush(cats);

  const addOnRedis = catBuilder.queuePushOnRedis("cato973", "cats");

  if (addOnRedis) {
    res
      .status(200)
      .json({ message: "Cat added by bulk method successfully", status: 200 });
  } else {
    res.status(403).json({ message: "Error bulk", status: 403 });
  }
};

/********************* \/GET LIKE ENDPOINT **********************/

type Vote = "like" | "dislike";

const vote = (choice: Vote, id: string) => {
  const exec = {
    builder: false,
    message: ""
  };
  switch (choice) {
    case "like":
      exec.builder = catBuilder.incLike(id);
      exec.message = "Success incremented like";
      break;
    case "dislike":
      exec.builder = catBuilder.decrLike(id);
      exec.message = "Success decremented like";
      break;
    default:
      process.stdout.write(
        "This message should be never read, `vote function`"
      );
  }

  return exec;
};

const manageReject = (opts: any, messageError: string) => {
  const { res } = opts;

  res.status(403).json({ message: messageError, status: 403 });
};

const catFoundWithSuccess = (data: any, opts: any, exec: any) => {
  const { res } = opts;
  process.stdout.write(`my data: ${JSON.stringify(data)}\n`);
  res.status(200).json({ results: data, message: exec.message, status: 200 });
};

const resolveCat = (data: any, opts: any, exec: any) => {
  if (data) {
    catFoundWithSuccess(data, opts, exec);
  } else {
    manageReject(opts, "Cat is not set");
  }
};

const catIsDefined = (opts: any) => {
  const { id, choice } = opts;
  const exec = vote(choice, id);

  if (exec.builder) {
    catBuilder.getCatById(id, (data: any) => {
      resolveCat(data, opts, exec);
    });
  } else {
    manageReject(opts, "Error is not a cat, like not changed value");
  }
};

const catIsUndefined = (opts: any) => {
  manageReject(opts, "Cat is undefined");
};

const searchCat = (exist: boolean, opts: any) => {
  if (exist) {
    catIsDefined(opts);
  } else {
    catIsUndefined(opts);
  }
};

const likeACat = (req: any, res: any) => {
  // Define constante
  const opts = {
    id: req.query.id || "catmash:182",
    choice: req.query.choice,
    res: res
  };

  // Search if cat exist
  catBuilder.isEditableVariable(
    "hash",
    `${opts.id}`,
    (exist: boolean): void => {
      searchCat(exist, opts);
    }
  );
};

/********************* END LIKE ENDPOINT **********************/

const getCats = (req: any, res: any) => {
  const id = req.query.id;

  const catBuilder = new CatBuilder();
  catBuilder.getListOfCat(id, (data: []) => {
    if (data.length > 0) {
      res.status(200).json({ datas: data, status: 200 });
    } else {
      res
        .status(403)
        .json({ message: "Sorry, no data found for this id", status: 403 });
    }
  });
};

export { addCatOnDb, insertCat, likeACat, getCats };
