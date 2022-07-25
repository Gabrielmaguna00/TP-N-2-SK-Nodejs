const express = require("express");
const router = express.Router();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  mySqlConnection.query("select * from products", (err, rows, fields) => {
    if (err) {
      console.log("Algo salio mal" + err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  mySqlConnection.query(
    "select * from products where id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (err) {
        console.log("Algo salio mal" + err);
      } else {
        res.json(rows[0]);
      }
    }
  );
});
router.post("/create", (req, res) => {
  let { name, price, category_id } = req.body;
  mySqlConnection.query(
    "insert into `Products` (`name`, `price`, `category_id`) values (?, ?, ?)",
    [name, price, category_id],
    (err, rows, fields) => {
      if (err) {
        console.log("Algo salio mal" + err);
      } else {
        res.send("Producto cargado correctamente.");
      }
    }
  );
});

module.exports = router;
