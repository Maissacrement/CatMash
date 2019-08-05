import Cat from "../../db/model/Cat";

const addCatOnDb = (_: any, res: any) => {
  const newCat = new Cat({
    image: "http://myimg.png",
    idAtelierApi: "26"
  });

  const isCreate = newCat.addCatOnRedis((id: any) => console.log(id));

  if (isCreate) {
    console.log('chat: ', newCat.id);
    res.status(200).json({ message: "User create successfully", status: 200 });
  } else {
    res.status(200).json({ message: "User is not create", status: 400 });
  }
};

export default addCatOnDb;
