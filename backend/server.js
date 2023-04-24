const express = require("express");
const mysql = require("mysql");
const formattingData = require("../backend/utils/date.js");

const app = express();
const PORT = 5000;

app.get("/clients", (req, res) => {
    const query = "SELECT * FROM clients";
    const field = "dateBirthday";
    formattingData.getData(query, field).then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Ошибка при получении данных");
    })
})

app.get("/orders", (req, res) => {
    const query = "SELECT idOrder, Client, composition, dateDeadline, customer, quantity, status FROM orders";
    const field = "dateDeadline";
    formattingData.getData(query, field).then((data) => {
      console.log(data);
      res.send(data);
    }).catch((err) => {
      console.log(err);
      res.status(500).send("Ошибка при получении данных");
    });
  });

app.get("/sells", (req, res) => {
    const query = "SELECT * FROM sells";
    const field = "dateSell";
    formattingData.getData(query, field).then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})