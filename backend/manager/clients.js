const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const bodyParser = require('body-parser');
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
const app = express();

// Разбор тела запроса в формате json
app.use(bodyParser.json());

// Разбор тела запроса в формате urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5015;

const conn = mysql.createConnection({
  host: "DESKTOP-ASKKTC8",
  user: "serverJS",
  database: "mydb",
  password: "jK7JgP5YbFyMRr",
  port: 3306,
})

async function getClients() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM clients", (err, results) => {
      if (err) {
        reject(err);
      } else {
        results.map((client) => {
          client["dateBirthday"] = moments(client["dateBirthday"]).format("DD.MM.YYYY");
        })
        resolve(results);
      }
    })
  })
}

async function startGetClients() {
  app.get("/clients", (req, res) => {
    getClients().then((results) => {
      res.send(results);
    })
  })
}

getRandomUniqueNumber("idClient", "clients").then(
  (id) => {
    console.log(id)
  }
)

app.post("/clients/add", async (req, res) => {
  try {
    const idClient = await getRandomUniqueNumber("idClient", "clients");
    const { surname, name, patronimyc, dateBirthday, phoneNumber, passportInfo, rating } = req.body;
    const query = `INSERT INTO clients(idClient, name, surname, patronimyc, dateBirthday, phoneNumber, passportInfo, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [idClient, surname, name, patronimyc, dateBirthday, phoneNumber, passportInfo, rating];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("OK");
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/clients/update", async (req, res) => {
  try {
    const { name, surname, patronimyc, phoneNumber, passportInfo, rating, idClient } = req.body;
    const query = `UPDATE clients SET name=?, surname=?, patronimyc=?, phoneNumber=?, passportInfo=?, rating=? WHERE idClient=?`;
    const values = [name, surname, patronimyc, phoneNumber, passportInfo, rating, idClient];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("OK");
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

startGetClients();

module.exports = startGetClients

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})