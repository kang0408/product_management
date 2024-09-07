const Product = require("../../models/product.model");
const filterButtonsHelper = require("../../helpers/filterButtons");
const searchHepler = require("../../helpers/search");

// [GET] admin/products
module.exports.products = async (req, res) => {
  const filterButtons = filterButtonsHelper(req.query);

  const find = {
    deleted: false,
  };

  if (req.query.status) find.status = req.query.status;

  const objectKeyword = searchHepler(req.query);

  if (objectKeyword.regex) {
    find.title = objectKeyword.regex;
    console.log(objectKeyword);
  }

  const products = await Product.find(find);

  console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterButtons: filterButtons,
    keyword: objectKeyword.keyword,
  });
};
