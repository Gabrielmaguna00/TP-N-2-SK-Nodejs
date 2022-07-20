const express = require("express");
const app = express();
const mysql = require("mysql");
const morgan = require("morgan");
const path = require("path");

app.engine("html", require("pug").renderFile);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.static("./views"));
// app.use(express.static("./css"));

app.set("port", process.env.PORT || 3000);

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto 3000"), app.get("port");
});
