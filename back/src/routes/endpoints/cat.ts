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

const likeACat = (_: any, res: any) => {
  const id = "catmash:182"; // req.query.id;

  const catBuilder = new CatBuilder();
  const exec = catBuilder.incLike(id);

  if (exec) {
    catBuilder.getCatById(id, (data: any) => console.log(data););
    res
      .status(200)
      .json({ message: "Success incremented like", status: 200 });
  } else {
    res.status(200).json({ message: "Error like is not incremented", status: 400 });
  }

  process.stdout.write(`\n${id}`);
  res.end();
};

export { addCatOnDb, insertCat, likeACat };
