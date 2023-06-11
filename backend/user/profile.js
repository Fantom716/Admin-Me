const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const cors = require("cors")
const conn = require("../utils/connectionDB")

const app = express();
app.use(cors());
const PORT = 5095;

app.post("/client/profile", (req, res) => {
  console.log(req.query)
  const idUser = req.query.user;
  collectData(idUser)
    .then((dataClient) => {
      console.log(dataClient);
      res.send(dataClient);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error getting client data");
    });
});

const collectData = (idUser) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT idClient, idClientInUser, name, surname, patronimyc, passportInfo, email, phoneNumber, regDate, rating FROM clients INNER JOIN users ON clients.idClient = users.idClientInUser WHERE idUser = ${idUser}`, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else if (res.length > 0) {
        const item = res[0];
        item.regDate = moment().format("YYYY-MM-DD HH:mm:ss");
        const dataClient = {
          idClient: item.idClient,
          idClientInUser: item.idClientInUser,
          name: item.name,
          surname: item.surname,
          patronimyc: item.patronimyc,
          passportInfo: item.passportInfo,
          email: item.email,
          phoneNumber: item.phoneNumber,
          regDate: item.regDate,
          rating: item.rating
        }
        resolve(dataClient);
      } else {
        const err = new Error("No client data found");
        console.log(err);
        reject(err);
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
