const Product = require("../../models/product.model");

// [GET] admin/products
module.exports.products = async (req, res) => {
  const filterButtons = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
    const idxButton = filterButtons.findIndex(
      (btn) => btn.status == req.query.status
    );
    filterButtons[idxButton].class = "active";
  } else {
    const idxButton = filterButtons.findIndex((btn) => btn.status == "");
    filterButtons[idxButton].class = "active";
  }

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
