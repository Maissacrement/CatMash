// Externe Import Modules
import express = require("express");
const router: any = express.Router();

// Import Pages
import BadRequest from "./endpoints/badRequest";
import { addCatOnDb, insertCat, likeACat } from "./endpoints/cat";

// Router

// GET
router
  .get("/newCat", addCatOnDb)
  .get("/like", likeACat)
  .get("/*", BadRequest);

// POST
router.post("/insert", insertCat).post("/*", BadRequest);

export default router;
