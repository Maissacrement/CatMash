import Cat from "../../db/model/Cat";
import CatBuilder from "../../db/model/CatBuilder";

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
    res.status(200).json({ message: "User is not create", status: 400 });
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
    res.status(200).json({ message: "Error bulk", status: 400 });
  }
};

type Vote = "like" | "dislike";

const vote = (builder: CatBuilder, choice: Vote, id: string) => {
  const exec = {
    builder: false,
    message: ""
  };
  switch(choice){
    case "like":
      exec.builder = builder.incLike(id);
      exec.message = "Success incremented like"
      break;
    case "dislike":
      exec.builder = builder.decrLike(id);
      exec.message = "Success decremented like"
      break;
    default:
      process.stdout.write(
        "This message should be never read, `vote function`"
      );
  }

  return exec;
}

const likeACat = (_: any, res: any) => {
  const id = "catmash:182"; // req.query.id;
  const choice = "dislike";

  const catBuilder = new CatBuilder();
  const exec = vote(catBuilder, choice, id);

  if (exec.builder) {
    catBuilder.getCatById(id, (data: any) => {
      process.stdout.write("\n" + JSON.stringify(data, null, 2))
    });
    res.status(200).json({ message: exec.message, status: 200 });
  } else {
    res
      .status(200)
      .json({ message: "Error like is not incremented", status: 400 });
  }
};

export { addCatOnDb, insertCat, likeACat };
