const Product = require("../../models/product.model");
const filterButtonsHelper = require("../../helpers/filterButtons");

// [GET] admin/products
module.exports.products = async (req, res) => {
  const filterButtons = filterButtonsHelper(req.query);

  const find = {
    deleted: false,
  };

  if (req.query.status) find.status = req.query.status;

  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;

    const rgx = new RegExp(keyword, "i");
    find.title = rgx;
  }

  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterButtons: filterButtons,
    keyword: keyword,
  });
};
