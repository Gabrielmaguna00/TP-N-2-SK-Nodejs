const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

const pedidosRoute = require("./Routes/orders");
const categoriesRoute = require("./Routes/categories");

app.engine("html", require("pug").renderFile);

app.use("/pedidos", pedidosRoute);
app.use("/categories", categoriesRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static("./views"));
// app.use(express.static("./css"));

app.set("port", process.env.PORT || 3000);
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/productos", productosRoute);
app.use("/stock", stocksRoute);
app.use("/negocios", negociosRoute);
app.use("/pedidos", pedidosRoute);
app.use("/cargos", positionRoute);
app.use("/empleados", staffRoute);

// Motor de plantillas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("./views"));

app.get("/", (req, res) => {
  res.render("index.pug");
});
app.get("*", (req, res) => {
  res.render("404.pug");
});
app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto 3000"), app.get("port");
});
