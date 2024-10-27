const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");

// [GET] admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categories = await ProductCategory.find(find);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    categories: categories,
  });
};

// [GET] admin/products-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create", {
    pageTitle: "Thêm danh mục sản phẩm",
  });
};

// [POST] admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments({});
    req.body.position = count + 1;
  } else {
    req.body.posiiton = parseInt(req.body.posiiton);
  }

  const newCategory = new ProductCategory(req.body);
  await newCategory.save();

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
