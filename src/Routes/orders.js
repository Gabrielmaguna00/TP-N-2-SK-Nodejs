const express = require("express");
const router = express.Router();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  mySqlConnection.query("select * from Orders", (err, rows, fields) => {
    if (err) {
      console.log("Algo salio mal" + err);
    } else {
      res.json(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  mySqlConnection.query(
    "select * from Orders where id = ?",
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
  let { status, store_id, staff_id, customer_id } = req.body;
  mySqlConnection.query(
    "INSERT INTO `orders`(`status`, `store_id`, `staff_id`, `customer_id`) VALUES (?, ?, ? )",
    [status, store_id, staff_id, customer_id],
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
