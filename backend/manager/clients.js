const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const bodyParser = require('body-parser');
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

app.post("/clients/add", (req, res) => {
  console.log(req.body);
  conn.query(`INSERT INTO clients(idClient, name, surname, patronimyc, dateBirthday, phoneNumber, passportInfo, rating) VALUES (1, '${req.body.surname}', '${req.body.name}', '${req.body.patronimyc}', '${req.body.dateBirthday}', '${req.body.phoneNumber}', '${req.body.passportInfo}', '${req.body.rating}')`, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("OK");
      res.send(results);
    }
  })
})

app.post("/clients/update", (req, res) => {
  console.log(req.body);
  conn.query(`UPDATE clients SET name='${req.body.name}', surname='${req.body.surname}', patronimyc='${req.body.patronimyc}', phoneNumber='${req.body.phoneNumber}', passportInfo='${req.body.passportInfo}', rating=${req.body.rating} WHERE idClient=${req.body.idClient}`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("OK");
      res.send(results);
    }
  })
})

app.post("/clients/delete", (req, res) => {
  conn.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to start transaction");
    }

    conn.query(`DELETE FROM orders WHERE client = ${req.body.idClient}`, (err, results) => {
      if (err) {
        console.log(err);
        return conn.rollback(() => res.status(500).send("Failed to delete orders"));
      }

      conn.query(`DELETE FROM clients WHERE idClient = ${req.body.idClient}`, (err, results) => {
        if (err) {
          console.log(err);
          return conn.rollback(() => res.status(500).send("Failed to delete client"));
        }

        conn.commit((err) => {
          if (err) {
            console.log(err);
            return conn.rollback(() => res.status(500).send("Failed to commit transaction"));
          }

          console.log("OK");
          res.send(req.body);
        });
      });
    });
  });
});

startGetClients();

module.exports = startGetClients

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})