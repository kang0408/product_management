const systemConfig = require("../../config/system");

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
    .sort({ position: "desc" })
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

// [PATCH] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect("back");
};

// [PATCH] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          status: "inactive",
        }
      );
      break;
    case "update-position":
      for (const item of ids) {
        let [id, pos] = item.split("-");
        pos = parseInt(pos);

        await Product.updateMany(
          {
            _id: { $in: id },
          },
          {
            position: pos,
          }
        );
      }
      break;
    default:
      break;
  }

  res.redirect("back");
};

// [DELTE] admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne(
    { _id: id },
    { deleted: true, deleledAt: new Date() }
  );

  res.redirect("back");
};

// [DELTE] admin/products/delete-multi
module.exports.deleteMultiProduct = async (req, res) => {
  const ids = req.body.ids.split(", ");

  await Product.updateMany(
    {
      _id: { $in: ids },
    },
    {
      deleted: true,
      deleledAt: new Date(),
    }
  );

  res.redirect("back");
};

// [GET] admin/products/create
module.exports.createProduct = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] admin/products/create
module.exports.createProductPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const productCount = await Product.countDocuments({});
    req.body.position = productCount + 1;
  } else {
    req.body.posiiton = parseInt(req.body.posiiton);
  }

  if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;

  const newProduct = new Product(req.body);
  await newProduct.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    console.log(product);

    res.render("admin/pages/products/edit", {
      pageTitle: "Sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] admin/products/edit/:id
module.exports.editProduct = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.posiiton = parseInt(req.body.posiiton);

  if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`;

  res.send(req.body);

  // res.redirect(`${systemConfig.prefixAdmin}/products`);
};
