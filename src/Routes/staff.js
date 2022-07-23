const express = require("express");
const router = express();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  const query = "select * from staff";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send("No se pudo mostrar la tabla de la base de datos!");
    } else {
      res.json(rows);
    }
  });
});

router.get("/store/:id", (req, res) => {
  const query = "select * from staff where store_id = (?)";
  mySqlConnection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res
        .status(404)
        .send("No se pudo mostrar el staff del stores seleccionado");
    } else {
      if (rows.length === 0) {
        res.send("No existe el dato a buscar!");
      } else {
        res.json(rows);
      }
    }
  });
});

router.get("/position/:id", (req, res) => {
  const query = "select * from staff where position_id = (?)";
  mySqlConnection.query(query, [req.params.id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res
        .status(404)
        .send("No se pudo mostrar el staff con la posicion seleccionada");
    } else {
      if (rows.length === 0) {
        res.send("No existe el dato a buscar!");
      } else {
        res.json(rows);
      }
    }
  });
});

router.post("/create", (req, res) => {
  const { name, store_id, position_id } = req.body;
  const query = "select * from staff where store_id = ? and position_id = ?";
  mySqlConnection.query(query, [store_id, position_id], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      if (rows.length) {
        res.send("El dato que desea crear ya existe!!");
      } else {
        const queryCall = "call addOrEdditStaff (?, ?, ?, ?)";
        mySqlConnection.query(
          queryCall,
          [0, name, store_id, position_id],
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

module.exports = router;
