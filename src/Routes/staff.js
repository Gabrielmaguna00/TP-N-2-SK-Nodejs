const express = require("express");
const router = express.Router();

const mySqlConnection = require("../database");

router.get("/", (req, res) => {
  const query = "select * from Staff";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send("No se pudo mostrar la tabla de la base de datos!");
    } else {
      res.render("staff.pug", { rows });
    }
  });
});

router.get("/store/:id", (req, res) => {
  const query = "select * from Staff where store_id = (?)";
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
        res.render("staff.pug", { rows });
      }
    }
  });
});

router.get("/position/:id", (req, res) => {
  const query = "select * from Staff where position_id = (?)";
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
        res.render("staff.pug", { rows });
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
