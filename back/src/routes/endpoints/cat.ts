import db from '../../db/index'

const addCatOnDb = (_: any, res: any) => {
  console.log(db);
  res.end();
};

export default addCatOnDb;
