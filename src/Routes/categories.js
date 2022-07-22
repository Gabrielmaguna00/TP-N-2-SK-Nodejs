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

router.get("/:id", (req, res) => {
  mySqlConnection.query(
    "select * from Categories where id = ?",
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
  let { name } = req.body;
  console.log(name);
  const query = "call addOrEdditCategories (?, ?)";
  mySqlConnection.query(query, [0, name], (err, rows, fields) => {
    if (err) {
      console.log("Algo salio mal" + err);
    } else {
      res.send("Orden cargada correctamente.");
    }
  });
});

module.exports = router;
