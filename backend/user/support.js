const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");
const bp = require("body-parser");
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
const app = express();
const PORT = 5030;
const conn = require("../utils/connectionDB")

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.post("/support", (req, res, err) => {
  console.log(req.body)
  getRandomUniqueNumber("idTicket", "support").then((idTicket) => {
    values = [idTicket, req.body.id, moment().format("YYYY-MM-DD HH:mm:ss"), req.body.title, req.body.text, "Ожидает ответа"];
    query = "INSERT INTO support (idTicket, user, dateOfApplication, title, descriptionProblem, status) VALUES (?, ?, ?, ?, ?, ?)";
    conn.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
});

app.get("/support/all", (req, res, err) => {
  const idUser = req.query.user
  const query = `SELECT * FROM support WHERE user = ?`
  const values = idUser
  conn.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      result.map((res) => {
        res["dateOfApplication"] = moment(res["dateDeadline"]).format("YYYY:MM:DD HH:mm:ss")
      })
      console.log(result)
      res.send(result);
    }
  });
})

const getSupportsUser = async (idUser) => {
  const query = `SELECT * FROM support WHERE user = ${idUser}`;
  return new Promise((resolve, reject) => {
    conn.query(query, idUser, (err, result) => {
      if (err) {
        reject(err);
      } else {
        result.map(item => {
          item.dateOfApplication = moment().format("YYYY-MM-DD HH:mm:ss")
        })
        resolve(result);
      }
    });
  });
}

function getSupports(idUser) {
  app.get("/supportUser", (req, res) => {
    getSupportsUser(idUser).then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})


module.exports = getSupports
