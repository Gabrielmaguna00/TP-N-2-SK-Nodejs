const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const pedidosRoute = require("./Routes/orders");
const stocksRoute = require("./Routes/stock");
const staffRoute = require("./Routes/staff");
const positionRoute = require("./Routes/position");

app.engine("html", require("pug").renderFile);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static("./views"));

app.set("port", process.env.PORT || 3000);

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.pug");
});
app.use("/pedidos", pedidosRoute);
app.use("/stock", stocksRoute);
app.use("/staff", staffRoute);
app.use("/cargos", positionRoute);

app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto 3000"), app.get("port");
});
