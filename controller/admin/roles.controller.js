const systemConfig = require("../../config/system");

const Role = require("../../models/roles.model");

// [GET] admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const roles = await Role.find(find);

  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    roles: roles,
  });
};

// [GET] admin/roles/create
module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Thêm nhóm quyền",
  });
};

// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
  const newRole = new Role(req.body);

  await newRole.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
