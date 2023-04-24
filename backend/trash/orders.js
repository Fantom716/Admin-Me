const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const moments = require("moment");
const formattingData = require("../utils/date.js");

const app = express();
const PORT = 5002;

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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
