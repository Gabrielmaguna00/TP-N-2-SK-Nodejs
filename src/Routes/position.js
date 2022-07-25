const express = require("express");
const router = express.Router();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  const query =
    "select Positions.name as position_name, Positions.id, Staff.position_id, Staff.name as staff_name From Positions inner join Staff on Positions.id = Staff.Position_id";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send("No se pudo mostrar la tabla de la base de datos!");
    } else {
      // res.json(rows);}
      res.render("cargos.pug", { rows });
    }
  });
});

router.get("/:name", (req, res) => {
  const query =
    "select Positions.name as position_name, Positions.id, Staff.position_id, Staff.name as staff_name From Positions inner join Staff on Positions.id = Staff.Position_id where Positions.name = (?)";
  mySqlConnection.query(query, [req.params.name], (err, rows, fields) => {
    if (err) {
      console.log("Algo salio mal" + err);
    } else {
      // res.json(rows);
      res.render("cargos.pug", { rows });
    }
  });
});

router.post("/create", (req, res) => {
  const { name } = req.body;
  console.log(name);
  const query = "select * from Positions where name = ?";
  mySqlConnection.query(query, [name], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      console.log(rows);
      if (rows.length) {
        res.send("El puesto a crear ya existe! ");
      } else {
        const queryInsert = "INSERT INTO Positions (name) VALUES (?)";
        mySqlConnection.query(queryInsert, [name], (err, rows, fields) => {
          if (err) {
            console.log(err);
            res.status(404).send(err);
          } else {
            res.send("Puesto creado con exito!");
          }
        });
      }
    }
  });
});

module.exports = router;
