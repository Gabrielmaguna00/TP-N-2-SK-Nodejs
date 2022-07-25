const express = require("express");
const router = express.Router();

const mySqlConnection = require("../database");

router.get("/", (req, res) => {
	mySqlConnection.query("select * from Stores", (err, rows, fields) => {
		if (err) {
			console.log("Algo salio mal" + err);
		} else {
			res.render("tiendas.pug", { rows });
		}
	});
});

router.get("/:name", (req, res) => {
  const query = "select Stores.name as store_name, Stores.id, Staff.store_id, Staff.name From Stores inner join Staff on Stores.id = Staff.store_id where Stores.name = (?)"
	mySqlConnection.query(
		query,
		[req.params.name],
		(err, rows, fields) => {
			if (err) {
				console.log("Algo salio mal" + err);
			} else {
				res.render("tiendas.pug", { rows });
			}
		}
	);
});

module.exports = router;
