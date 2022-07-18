const express = require('express')
const router = express.Router()

const mySqlConnection = require('../database')

router.get('/', (req, res) => {
	mySqlConnection.query(
		"select * from Products", (err, rows, fields) => {
			if (err) {
				console.log("Algo salio mal" + err)
			}
			else {
				res.json(rows)
			}
		})
})

router.get('/:id', (req, res) => {
	mySqlConnection.query(
		"select * from Products where id = ?", [req.params.id], (err, rows, fields) => {
			if (err) {
				console.log("Algo salio mal" + err)
			}
			else {
				res.json(rows[0])
			}
		})
})

module.exports = router