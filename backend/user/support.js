const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");
const bp = require("body-parser");
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
const app = express();
const PORT = 5030;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const conn = mysql.createConnection({
  host: "DESKTOP-ASKKTC8",
  user: "serverJS",
  database: "mydb",
  password: "jK7JgP5YbFyMRr",
  port: 3306,
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

app.post("/support", (req, err) => {
  getRandomUniqueNumber("idTicket", "support").then((idTicket) => {
    values = [idTicket, req.body.id, moment().format("YYYY-MM-DD HH:mm:ss"), req.body.title, req.body.text, "Ожидает ответа"];
    query = "INSERT INTO support (idTicket, user, dateOfApplication, title, descriptionProblem, status) VALUES (?, ?, ?, ?, ?, ?)";
    conn.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(values)
        console.log(result);
      }
    });
  });
});

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
  console.log(`Example app listening at http://localhost:${PORT}`);
})


module.exports = getSupports