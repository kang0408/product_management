const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/products.controller");

router.get("", controller.products);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProduct);

router.delete("/delete-multi", controller.deleteMultiProduct);

router.get("/create", controller.createProduct);

router.post("/create", controller.createProductPost);

module.exports = router;
