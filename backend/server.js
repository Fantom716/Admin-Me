const express = require("express");
const mysql = require("mysql");
const moments = require("moment");

const app = express();
const PORT = 5000;

const conn = mysql.createConnection({
  host: "DESKTOP-ASKKTC8",
  user: "serverJS",
  database: "mydb",
  password: "jK7JgP5YbFyMRr",
  port: 3306,
})

app.get("/clients", (req, res) => {
  conn.query("SELECT * FROM clients", "dateBirthday", (err, results) => {
    if (err) {
        console.log(err);
    } else {
      for (let i = 0; i < results.length; i++) {
        results[i].dateBirthday = moments(results[i].dateBirthday).format("YYYY-MM-DD");
      }
      res.send(results);
    }
  })
})

app.get("/orders", (req, res) => {
  conn.query("SELECT idOrder, clients.name, clients.surname, clients.patronimyc, composition, dateDeadline, manager, quantity, status FROM orders INNER JOIN clients ON orders.Client = clients.idClient", (err, results) => {
    if (err) {
        console.log(err);
    } else {
        for (let i = 0; i < results.length; i++) {
          results[i]["dateDeadline"] = moments(results[i]["dateDeadline"]).format("YYYY-MM-DD HH:mm:ss");
        }
        res.send(results);
    }
  })
})

app.get("/sells", (req, res) => {
  conn.query("SELECT idSell, idOrder, seller, price, countSell, dateSell FROM sells", (err, results) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        for (let i = 0; i < results.length; i++) {
          results[i]["dateSell"] = moments(results[i]["dateSell"]).format("YYYY-MM-DD HH:mm:ss");
        }
        res.send(results);
    }
  })
})

app.get("/partners", (req, res) => {
  conn.query("SELECT idPartner, nameCompany, type, phoneNumber, address, dateConclusionContract, email, nameDelegate, surnameDelegate, patronymicDelegate FROM partners", (err, results) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        for (let i = 0; i < results.length; i++) {
          results[i]["dateConclusionContract"] = moments(results[i]["dateConclusionContract"]).format("YYYY-MM-DD");
        }
        res.send(results);
    }
  })
})

app.get("/products", (req, res) => {
  conn.query("SELECT idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, nameCompany, countSell, dateOfSell FROM products INNER JOIN partners ON products.developer = partners.idPartner", (err, results) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        for (let i = 0; i < results.length; i++) {
          results[i]["dateOfSell"] = moments(results[i]["dateOfSell"]).format("YYYY-MM-DD");
        }
        res.send(results);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})