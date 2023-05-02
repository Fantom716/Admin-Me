const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const moment = require("moment");
const bp = require("body-parser");
const getPartners = require("../manager/partners");
const startGetSells = require("../manager/sells");
const startGetProducts = require("../manager/products");
const startGetClients = require("../manager/clients");
const startGetOrders = require("../manager/oders");
const { startStat } = require("../manager/homeManager");

const app = express();
const PORT = 5007;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

function RandomValue(min = 1, max = 10000) {
    return Math.floor(Math.random() * (max - min))
}

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

conn.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
})


app.post('/form', async (req, res) => {
    const userData = req.body;
    console.log(userData);
    idUser = userData.id;

    try {
      await writingSession(idUser);
      await startStat
      await getPartners
      await startGetSells
      await startGetProducts
      await startGetClients
      await startGetOrders
      await startStat
      res.send(userData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


async function writingSession(idUser) {
    let date = new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
    date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
    conn.query(`INSERT INTO sessions(idSession, userId) VALUES(4, ${idUser})`, (err, results) => {
        if (err) console.log(err);
        else {
            console.log("OK");
        }
    })
}

app.get("/users", (req, res) => {
    conn.query("SELECT idUser, login, password, email, role FROM users", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
