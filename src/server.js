const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

const productosRoute = require("./Routes/products");
const stocksRoute = require("./Routes/stock");
const negociosRoute = require("./Routes/stores");
const pedidosRoute = require("./Routes/orders");
const positionRoute = require("./Routes/position");
const staffRoute = require("./Routes/staff");

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
