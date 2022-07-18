const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "gabriel004",
  database: "latablita",
});

mySqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Entraste a la matrix");
  }
});

module.exports = mySqlConnection;
