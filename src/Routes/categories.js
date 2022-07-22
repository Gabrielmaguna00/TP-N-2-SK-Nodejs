const express = require("express");
const router = express.Router();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  mySqlConnection.query("select * from Categories", (err, rows, fields) => {
    if (err) {
      console.log("Algo salio mal" + err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/create", (req, res) => {
  let { id, name } = req.body;
  mySqlConnection.query(
    "INSERT INTO `categories`(`id`, `name`) VALUES (?, ?, ? )",
    [id, name],
    (err, rows, fields) => {
      if (err) {
        console.log("Algo salio mal" + err);
      } else {
        res.send("Orden cargada correctamente.");
      }
    }
  );
});

module.exports = router;
