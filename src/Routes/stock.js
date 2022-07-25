const express = require("express");
const router = express.Router();

const mySqlConnection = require("../database");

router.get("/", (req, res) => {
  const query =
    "select Stocks.id as stocks_id, Stocks.quantity, Stocks.store_id, Stocks.product_id, Stores.id as store_id, Stores.name as store_name, Products.id as product_id, Products.name as product_name from Stocks inner join Stores on Stocks.store_id = Stores.id inner join Products on Stocks.product_id = Products.id;";
    mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send("No se pudo mostrar la tabla de la base de datos!");
    } else {
      console.log(rows);
      res.render("stock.pug", { rows });
    }
  });
});
router.get("/stores/:name", (req, res) => {
  const query =
    "select stocks.product_id, store_id, stocks.quantity, stores.id as store_id, stores.name as store_name, products.name as product_name, products.id From stocks inner join stores on stocks.store_id = stores.id inner join products on stocks.product_id = products.id where stores.name = (?)  ";
  mysqlConnection.query(query, [req.params.name], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res
        .status(404)
        .send(
          `No se encontro el stock del store con el nombre: ${req.params.name}`
        );
    } else {
      // res.json(rows)
      res.render("stock.pug", { rows });
    }
  });
});
router.get("/products/:id", (req, res) => {
  const query = "select * from stocks where product_id = ?";
  mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res
        .status(404)
        .send(`No se encontro el stock del producto con id: ${req.params.id}`);
    } else {
      res.render("stock.pug", { rows });
    }
  });
});
router.post("/", (req, res) => {
  const { quantity, store_id, product_id } = req.body;
  const query = "select * from stocks where product_id = ? and store_id = ?";
  mysqlConnection.query(query, [product_id, store_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      if (rows.length) {
        res.send("El dato a postear ya existe!! "); //como enviar un msj y el json del dato que ya existe?
      } else {
        const queryCall = "call addOrEdditstocks (?, ?, ?, ?)";
        mysqlConnection.query(
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
  mysqlConnection.query(
    query,
    [req.params.id, store_id, product_id, quantity],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.status(404).send("No se logro completar el edit");
      } else {
        res.json(`El dato con id: ${req.params.id} fue editado con exito!`);
      }
    }
  );
});

module.exports = router;
