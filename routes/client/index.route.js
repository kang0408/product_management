const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const postRoutes = require("./posts.route");

module.exports = (app) => {
  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/posts", postRoutes);
};
