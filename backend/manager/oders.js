const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
        resolve(results);
        console.log(results);
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

app.post("/orders/add", (req, res) => {
  console.log(req.body);
  conn.query(`INSERT INTO orders(idOrder, client, composition, dateDeadline, manager, quantity, status, clients_idClients) VALUES(1, ${req.body.client}, '${req.body.composition}', '${req.body.dateDeadline}', '${req.body.manager}', '${req.body.quantity}', '${req.body.status}', ${req.body.client})
  `, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("OK");
      res.send(results);
    }
  })
})

app.post("/orders/update", (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

app.post("/orders/delete", (req, res) => {
  console.log(req.body);
  conn.query(`DELETE FROM orders WHERE idOrder = ${req.body.idOrder}`, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("OK");
      res.send(results);
    }
  })
})

startGetOrders();

module.exports = startGetOrders

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})