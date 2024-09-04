const express = require("express"); // import express
require("dotenv").config();

const route = require("./routes/client/index.route");

const app = express(); // gọi hàm
const port = process.env.PORT; // cổng

app.set("views", "./views");
app.set("view engine", "pug");

// Routes
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
