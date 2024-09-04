const express = require("express"); // import express
require("dotenv").config();

const database = require("./config/database");

const route = require("./routes/client/index.route");

database.connect();

const app = express(); // gọi hàm
const port = process.env.PORT; // cổng

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
