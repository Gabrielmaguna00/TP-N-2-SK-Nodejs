const express = require("express");
const router = express();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  const query = "select * from stocks";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/stores/:id", (req, res) => {
  const query = "select * from stocks where store_id = ?";
  mySqlConnection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/products/:id", (req, res) => {
  const query = "select * from stocks where product_id = ?";
  mySqlConnection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/", (req, res) => {
  const { quantity, store_id, product_id } = req.body;
  const query = "select * from stocks where product_id = ? and store_id = ?";
  const queryCall = "call addOrEdditStocks (?, ?, ?, ?)";
  mySqlConnection.query(query, [product_id, store_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    if (rows.length) {
      res.send("El dato a postear ya existe: "); //como enviar un msj y el json del dato que ya existe?
    } else {
      mySqlConnection.query(
        queryCall,
        [0, store_id, product_id, quantity],
        (err, rows, fields) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Creado con exito!");
          }
        }
      );
    }
  });
});
router.put("/:id", (req, res) => {
  //que es mejor practica, poner id y cantidad en params o id en params y cantidad en body?
  const { quantity, store_id, product_id } = req.body;
  const query = "call addOrEdditStocks (?, ?, ?, ?)";
  mySqlConnection.query(
    query,
    [req.params.id, store_id, product_id, quantity],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.json(`El dato con id: ${req.params.id} fue editado con exito!`);
      }
    }
  );
});

module.exports = router;
