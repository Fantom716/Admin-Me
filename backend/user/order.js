const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const conn = require("../utils/connectionDB")

moment = require('moment');

const PORT = 5008;

app.post("/orders", async (req, res) => {
  const idUser = req.query.user;
  const orders = await getOrder(idUser);
  res.send(orders)
})

const getClient = async (idUser) => {
  const query = `SELECT idClientInUser FROM users WHERE idUser = ${idUser}`;
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const idClient = result[0].idClientInUser;
        resolve(idClient);
      }
    });
  });
};

const getOrder = async (idUser) => {
  const idClient = await getClient(idUser);
  try {
    const query = `SELECT * FROM orders WHERE client = ${idClient}`;
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          result.map((res) => {
            res["dateDeadline"] = moment(res["dateDeadline"]).format("YYYY:MM:DD HH:mm:ss")
          })
          console.log(result)
          resolve(result);
        }
      });
    });
  }
  catch {
    return console.log("error")
  }
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
