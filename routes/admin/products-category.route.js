const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controller/admin/products-category.controller");

router.get("", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);

module.exports = router;
