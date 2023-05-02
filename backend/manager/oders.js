const express = require("express");
const mysql = require("mysql");
const moments = require("moment");

const app = express();
const PORT = 5012;

const conn = mysql.createConnection({
  host: "DESKTOP-ASKKTC8",
  user: "serverJS",
  database: "mydb",
  password: "jK7JgP5YbFyMRr",
  port: 3306,
})

async function getOrders() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT idOrder, clients.name, clients.surname, clients.patronimyc, composition, dateDeadline, manager, quantity, status FROM orders INNER JOIN clients ON orders.client = clients.idClient", (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        results.map((order) => {
          order["dateDeadline"] = moments(order["dateDeadline"]).format("DD.MM.YYYY HH:mm:ss");
        })
        console.log(results);
        resolve(results);
      }
    })
  })
}

async function startGetOrders() {
    app.get("/orders", (req, res) => {
      getOrders().then((results) => {
        res.send(results);
      })
    })
}

startGetOrders();

module.exports = startGetOrders

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})