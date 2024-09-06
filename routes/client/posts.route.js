const express = require("express");
const router = express.Router();

const postRoutes = require("../../controller/client/posts.controller");

router.get("", postRoutes.posts);

module.exports = router;
