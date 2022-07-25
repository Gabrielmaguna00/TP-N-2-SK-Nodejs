const express = require("express");
const router = express.Router();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  const query = "select * from Stocks";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send("No se pudo mostrar la tabla de la base de datos!");
    } else {
      res.json(rows);
    }
  });
});
router.get("/stores/:id", (req, res) => {
  const query = "select * from Stocks where store_id = ?";
  mySqlConnection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/products/:id", (req, res) => {
  const query = "select * from Stocks where product_id = ?";
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
  const query = "select * from Stocks where product_id = ? and store_id = ?";
  mySqlConnection.query(query, [product_id, store_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      if (rows.length) {
        res.send("El dato a postear ya existe!! "); //como enviar un msj y el json del dato que ya existe?
      } else {
        const queryCall = "call addOrEdditstocks (?, ?, ?, ?)";
        mySqlConnection.query(
          queryCall,
          [0, store_id, product_id, quantity],
          (err, rows, fields) => {
            if (err) {
              console.log(err);
              res.status(404).send(err);
            } else {
              res.send("Creado con exito!");
            }
          }
        );
      }
    }
  });
});
router.put("/:id", (req, res) => {
  //que es mejor practica, poner id y cantidad en params o id en params y cantidad en body?
  const { quantity, store_id, product_id } = req.body;
  const query = "call addOrEdditstocks (?, ?, ?, ?)";
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
