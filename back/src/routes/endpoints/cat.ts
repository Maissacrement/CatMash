import Cat from "../../db/model/Cat";

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

const likeACat = (req: any, res: any) => {
  const id = req.query.id;

  process.stdout.write(id);
  res.end();
};

export { addCatOnDb, likeACat };
