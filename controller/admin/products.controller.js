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
  }

  // Pagination
  const objectPagination = {
    limitedPage: 4,
  };

  const countPages = await Product.countDocuments(find);
  objectPagination.totalPages = Math.ceil(
    countPages / objectPagination.limitedPage
  );

  if (req.query.page) {
    objectPagination.currentPage = Number(req.query.page);
    objectPagination.skipPage = Number(
      (objectPagination.currentPage - 1) * objectPagination.limitedPage
    );
  } else {
    objectPagination.currentPage = 1;
    objectPagination.skipPage = Number(
      (objectPagination.currentPage - 1) * objectPagination.limitedPage
    );
  }
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
