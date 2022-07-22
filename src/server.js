const express = require("express");
const app = express();
const mysql = require("mysql");
const morgan = require("morgan");
const path = require("path");

app.use(express.json());

const pedidosRoute = require("./Routes/orders");
const categoriesRoute = require("./Routes/categories");
const productosRoute = require("./Routes/products");

app.engine("html", require("pug").renderFile);

app.use("/pedidos", pedidosRoute);
app.use("/categories", categoriesRoute);
app.use("/productos", productosRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static("./views"));

app.set("port", process.env.PORT || 3000);

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto 3000"), app.get("port");
});
