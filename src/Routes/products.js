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
    "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)",
    [name, price, category_id],
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
