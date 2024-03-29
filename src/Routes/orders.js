const express = require("express");
const router = express.Router();

const mySqlConnection = require("../database");

router.get("/", (req, res) => {
  mySqlConnection.query("select * from Orders", (err, rows, fields) => {
    if (err) {
      console.log("Algo salio mal" + err);
    } else {
      res.render("orders", { rows });
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
        res.render("orders", { rows })
      }
    }
  );
});

router.post("/create", (req, res) => {
  let { status, store_id, staff_id, customer_id } = req.body;
  mySqlConnection.query(
    "INSERT INTO `Orders`(`status`, `store_id`, `staff_id`, `customer_id`) VALUES (?, ?, ? )",
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
