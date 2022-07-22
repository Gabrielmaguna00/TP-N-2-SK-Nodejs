const express = require("express");
const router = express();

const mySqlConnection = require("../databaseDB");

router.get("/", (req, res) => {
  const query = "select * from positions";
  mySqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send("No se pudo mostrar la tabla de la base de datos!");
    } else {
      res.json(rows);
    }
  });
});

router.post("/create", (req, res) => {
  const { name } = req.body;
  console.log(name)
  const query = "select * from positions where name = ?";
  mySqlConnection.query(query, [name], (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
        console.log(rows)
      if (rows.length) {
        res.send("El puesto a crear ya existe! ");
      } else {
        const queryInsert = "INSERT INTO positions (name) VALUES (?)";
        mySqlConnection.query(queryInsert, [name], (err, rows, fields) => {
          if (err) {
            console.log(err);
            res.status(404).send(err);
          } else {
            res.send("Puesto creado con exito!")
          }
        });
      }
    }
  });
});

module.exports = router;
