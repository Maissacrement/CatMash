// Externe Import Modules
import express = require("express");
const router: any = express.Router();

// Import Pages
import BadRequest from "./endpoints/badRequest";

// Router
router.get("/*", BadRequest);

export default router;
