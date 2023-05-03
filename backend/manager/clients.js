const express = require("express");
const mysql = require("mysql");
const moments = require("moment");

const app = express();
const PORT = 5015;

const conn = mysql.createConnection({
  host: "DESKTOP-ASKKTC8",
  user: "serverJS",
  database: "mydb",
  password: "jK7JgP5YbFyMRr",
  port: 3306,
})

async function getClients() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM clients", (err, results) => {
      if (err) {
        reject(err);
      } else {
        results.map((client) => {
          client["dateBirthday"] = moments(client["dateBirthday"]).format("DD.MM.YYYY HH:mm:ss");
        })
        resolve(results);
      }
    })
  })
}

async function startGetClients() {
  app.get("/clients", (req, res) => {
    getClients().then((results) => {
      res.send(results);
    })
  })
}

startGetClients();

module.exports = startGetClients

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})