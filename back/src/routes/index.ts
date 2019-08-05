// Externe Import Modules
import express = require("express");
const router: any = express.Router();

// Import Pages
import BadRequest from "./endpoints/badRequest";
import { addCatOnDb, likeACat } from "./endpoints/cat";

// Router
router.get("/newCat", addCatOnDb);
router.get("/like", likeACat);
router.get("/*", BadRequest);

export default router;
