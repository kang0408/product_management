const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controller/admin/products.controller");

router.get("", controller.products);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProduct);

router.delete("/delete-multi", controller.deleteMultiProduct);

router.get("/create", controller.createProduct);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createProductPost
);

// router.get("/edit/:id", controller.edit);

// router.post("/edit", controller.editProduct);

router.get("/detail/:id", controller.detailProduct);

module.exports = router;
