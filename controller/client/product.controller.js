const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = products.map((item) => {
    item.priceNew = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);

    return item;
  });
  console.log(newProducts);

  res.render("client/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: newProducts,
  });
};

// [GET] /products/detail/:id
module.exports.detailProduct = async (req, res) => {
  const id = req.params.id;
  const find = {
    _id: id,
    deleted: false,
  };

  const product = await Product.findOne(find);

  res.render("client/pages/products/detail", {
    pageTitle: product.title,
    product: product,
  });
};
