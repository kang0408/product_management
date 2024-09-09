const Product = require("../../models/product.model");
const filterButtonsHelper = require("../../helpers/filterButtons");
const searchHepler = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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
  }

  // Pagination
  const countPages = await Product.countDocuments(find);
  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitedPage: 4,
    },
    countPages,
    req.query
  );
  // End Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitedPage)
    .skip(objectPagination.skipPage);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterButtons: filterButtons,
    keyword: objectKeyword.keyword,
    pagination: objectPagination,
  });
};

// [GET] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("back");
};
