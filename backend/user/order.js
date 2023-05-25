const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const conn = require("../utils/connectionDB")

moment = require('moment');

const PORT = 5008;

const selectOrder = async (idUser) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT idClientInUser FROM users WHERE idUser = ${idUser}`, (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        idClient = result[0].idClientInUser
        query = `SELECT * FROM orders WHERE client = ${idClient}`
        conn.query(query, (err, result) => {
          if (err) {
            reject(err)
          }
          result.map((order) => {
            order.dateDeadline = moment(order.dateDeadline).format("DD.MM.YYYY HH:mm:ss");
          })
          console.log("udedhudehu")
          resolve(result)
        })
      }
    })
  })
}

function insertOrder(idUser) {
  app.get('/orders', (req, res) => {
    selectOrder(idUser).then((result) => {
      res.send(result)
    })
  })
}

insertOrder(1);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = insertOrder
