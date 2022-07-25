const express = require("express");
const app = express();
const mysql = require("mysql");
const morgan = require("morgan");
const path = require("path");
const stocks = require("./Routes/Stock");
const staff = require("./Routes/staff");
const position = require("./Routes/position");

app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
app.use(morgan("tiny"));
app.use(express.json());

app.use("/stock", stocks);
app.use("/staff", staff);
app.use("/position", position);

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
