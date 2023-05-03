const express = require("express");
const mysql = require("mysql");
const bp = require("body-parser");
const getPartners = require("../manager/partners");
const startGetSells = require("../manager/sells");
const startGetProducts = require("../manager/products");
const startGetClients = require("../manager/clients");
const startGetOrders = require("../manager/oders");
const { startStat } = require("../manager/homeManager");
const queryAndUpdate = require("../user/homeUser");
const insertOrder = require("../user/order");
const ordersPromise = require("../user/order");

const app = express();
const PORT = 5007;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

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

const getRandomUniqueNumber = () => {
  let uniqueNumber = new Date().valueOf().toString();
  while (uniqueNumber <= 1) {
    uniqueNumber = new Date().valueOf().toString();
  }
  return uniqueNumber;
}

const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');

app.post('/form', async (req, res) => {
  const userData = await req.body;
  idUser = await userData.id;
  try {
    await writingSession(idUser);

    await startStat
    await getPartners
    await startGetSells
    await startGetProducts
    await startGetClients
    await startGetOrders

    await queryAndUpdate.getStat(idUser);
    await insertOrder(idUser);

    res.send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function writingSession(idUser) {
    conn.query(`INSERT INTO sessions(idSession, idUser, dateStartSession) VALUES(${getRandomUniqueNumber()}, ${idUser}, '${nowDate}')`, (err, results) => {
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
