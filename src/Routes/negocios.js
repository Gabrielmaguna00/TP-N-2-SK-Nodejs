const express = require('express');
const router = express.Router();

const mySqlConnection = require("../database");

router.get("/", (req, res) => {
	mySqlConnection.query("select * from Stores", (err, rows, fields) => {
		if (err) {
			console.log("Algo salio mal" + err);
		} else {
			// res.json(rows);
			res.render("tiendas.pug", { rows })
		}
	});
});

module.exports = router;