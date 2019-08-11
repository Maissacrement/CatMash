import axios from 'axios';
import Cat from "../../db/model/Cat";
import CatBuilder from "../../db/model/CatBuilder";
import { ICat } from "../../types/index";

const catBuilder: CatBuilder = new CatBuilder();
const myCatModel: Cat = new Cat();

/******************** POST: Bulk Insert Cats ********************/

/*
  const insertCat = (req: any, res: any) => {
  const cats: ICat[] = req.body;

  // Add cat on queue builder
  catBuilder.queuePush(cats);

  const addOnRedis = catBuilder.queuePushOnRedis(myCatModel.getCatModel());

  if (addOnRedis) {
    res
      .status(200)
      .json({ message: "Cat added by bulk method successfully", status: 200 });
  } else {
    res.status(403).json({ message: "Error bulk", status: 403 });
  }*/

const tryExecuteCreateCat = (exec: any, res: any) => {
  if (exec) {
    res
      .status(200)
      .json({ message: "Cat added by bulk method successfully", status: 200 });
  } else {
    res.status(403).json({ message: "Error bulk", status: 403 });
  }
}

const createCat = async (listOfCats: ICat[], res: any) => {
  const cats: ICat[] = listOfCats;
  const getCats = await catBuilder.formatCat(cats);

  // Add cat on queue builder
  catBuilder.queuePush(getCats);

  const addOnRedis = catBuilder.queuePushOnRedis(myCatModel.getCatModel());

  // Try exec Db Request
  tryExecuteCreateCat(addOnRedis, res);
}

const catExist = (opts: any) => {
  const { catsList, response, state } = opts;
  if(state) {
    createCat(catsList.data.images, response);

  } else {
    throw new Error('Cats is not defined');
  }
}

const insertCat = async (_: any, res: any, next: any) => {
  let cats;
  try {
    cats = await axios.get('https://latelier.co/data/cats.json');
    const isDefined = Object.prototype.hasOwnProperty.call(cats.data, 'images');
    const opts = {
      catsList : cats,
      response: res,
      state: isDefined,
    }

    catExist(opts);
  } catch (err) {
    next(err); // Continue after Error handling
    throw new Error('Error to fetch cats');
  }
};

/******************** END Post Bulk Insert Cats ********************/

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
  // process.stdout.write(`my data: ${JSON.stringify(data)}\n`);
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

const likeACat = (req: any, result: any) => {
  // Define constante
  const opts = {
    choice: req.query.choice,
    id: req.query.id,
    res: result
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

/******************** GET CAT ENDPOINT ************************/

const getCats = async (_: any, res: any) => {
  try {
    const cats = await myCatModel.getCats();

    res.status(200).json({
      response: cats,
      status: 200
    })
  } catch (err) {
    res.status(403).json({
      response: err,
      status: 403
    })
  }
};

/***************** END GET CAT ENDPOINT *********************/

export { insertCat, likeACat, getCats };
