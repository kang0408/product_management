const express = require("express");
const multer = require("multer");

const router = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

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
  controller.createProductPost
);

router.get("/edit/:id", controller.edit);

router.post("/edit", controller.editProduct);

module.exports = router;
