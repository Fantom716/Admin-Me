const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const app = express();
const bodyParser = require('body-parser');
const id = require("../utils/getRandomUniqueNumber");
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
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

app.post("/orders/add", async (req, res) => {
  try {
    const idOrder = await getRandomUniqueNumber("idOrder", "orders");
    const { client, composition, dateDeadline, manager, quantity, status } = req.body;
    const query = `INSERT INTO orders(idOrder, client, composition, dateDeadline, manager, quantity, status, clients_idClients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [idOrder, client, composition, dateDeadline, manager, quantity, status, client];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/orders/update", (req, res) => {
  console.log(req.body);
  const { idOrder, composition, dateDeadline, manager, quantity, status } = req.body;
  const values = [ client, composition, dateDeadline, manager, quantity, status ]
  const query = "UPDATE orders SET ? ? ? ? ? ? ? ? WHERE idOrder = ?";
  conn.query(query, values, (err, res) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(res);
    }
  })
})

app.post("/orders/delete", async (req, res) => {
  try {
    const { idOrder } = req.body;
    const query = `DELETE FROM orders WHERE idOrder = ?`;
    const values = [idOrder];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


startGetOrders();

module.exports = startGetOrders

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})