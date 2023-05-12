const express = require("express");
const mysql = require("mysql");
const bp = require("body-parser");
const getPartners = require("../manager/partners");
const startGetSells = require("../manager/sells");
const startGetProducts = require("../manager/products");
const startGetOrders = require("../manager/orders");
const { startStat } = require("../manager/homeManager");
const queryAndUpdate = require("../user/homeUser");
const insertOrder = require("../user/order");
const sendDataProfile = require("../user/profile");
const getStatisticAdmin = require("../admin/homeAdmin");
const getUsers = require("../admin/users");
const startGetClients = require("../manager/clients");
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
const getSupports = require("../user/support");

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

const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');

app.post('/form', async (req, res) => {

  const userData = await req.body;
  idUser = await userData.id;

  try {

    // Create session
    await writingSession(idUser);

    // Get data for manager
    await startStat
    await getPartners
    await startGetSells
    await startGetProducts
    await startGetClients
    await startGetOrders

    // Get data for users
    await queryAndUpdate.getClientId(idUser)
    await insertOrder(idUser)
    await sendDataProfile(idUser)
    await getSupports(idUser)

    // Get data for admin
    await getStatisticAdmin
    await getUsers

    // Send data
    res.send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/registration", async (req, res) => {
  try {
    console.log(req.body)
    const idUser = await getRandomUniqueNumber("idUser", "users")
    console.log(idUser + ": id")
    const idClient  = await getRandomUniqueNumber("idClient", "clients")
    const valuesUser = [idUser, req.body.login, req.body.email, req.body.role, moment().format("YYYY-DD-MM HH:mm:ss"), req.body.password, idClient ]
    const valuesClient = [ idClient, req.body.surname, req.body.name, req.body.patronimyc, 5 ]
    console.log(valuesClient)
    console.log(valuesUser)
    await addClient(valuesClient)
    await addUser(valuesUser)
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

async function writingSession(idUser) {
  const idSession = await getRandomUniqueNumber("idSession", "sessions");

  const query = "INSERT INTO sessions(idSession, idUser, dateStartSession) VALUES (?, ?, ?)";
  const values = [idSession, idUser, nowDate];

  conn.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("OK");
    }
  });
}
async function addUser(valuesUser) {
  const queryUser = `INSERT INTO users(idUser, login, email, role, regDate, password, idClientInUser) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  console.log(queryUser)
  conn.query(queryUser, valuesUser), (err, res) => {
    if (err) console.log(err);
    else {
      console.log("OK")
    }
  }
}

async function addClient(valuesClient) {
  const queryClient = `INSERT INTO clients(idClient, surname, name, patronimyc, rating) VALUES (?,?,?,?,?)`
  console.log(queryClient)
  conn.query(queryClient, valuesClient, (err, res) => {
    if (err) console.log(err);
    else {
      console.log("OK")
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