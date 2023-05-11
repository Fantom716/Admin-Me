const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const bodyParser = require('body-parser');
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5003;

const conn = mysql.createConnection({
	host: "DESKTOP-ASKKTC8",
	user: "serverJS",
	database: "mydb",
	password: "jK7JgP5YbFyMRr",
	port: 3306,
})

async function getPartners() {
	return new Promise((resolve, reject) => {
		conn.query("SELECT * FROM partners", (err, results) => {
			if (err) {
				reject(err);
			} else {
				results.map((partner) => {
					partner["dateConclusionContract"] = moment(partner["dateConclusionContract"]).format("DD.MM.YYYY HH:mm:ss");
				})
				resolve(results);
			}
		})
	})
}

app.post("/partners/add", async (req, res) => {
  try {
    const idPartner = await getRandomUniqueNumber("idPartner", "partners");
    const { type, phoneNumber, address, dateConclusionContract, email, nameDelegate, surnameDelegate, patronymicDelegate, nameCompany } = req.body;
    const query = `INSERT INTO partners(idPartner, type, phoneNumber, address, dateConclusionContract, email, nameDelegate, surnameDelegate, patronymicDelegate, nameCompany) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [idPartner, type, phoneNumber, address, dateConclusionContract, email, nameDelegate, surnameDelegate, patronymicDelegate, nameCompany];
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

app.post("/partners/delete", async (req, res) => {
  try {
    const { idPartner } = req.body;
    const query = `DELETE FROM partners WHERE idPartner = ?`;
    const values = [idPartner];
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

app.post("/partners/update", async (req, res) => {
  console.log(req.body);
  try {
    const { type, phoneNumber, address, dateConclusionContract, email, nameDelegate, surnameDelegate, patronymicDelegate, nameCompany, idPartner } = req.body;
    const formattedDate = moment(dateConclusionContract, "DD.MM.YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    const query = `UPDATE partners SET type=?, phoneNumber=?, address=?, dateConclusionContract=?, email=?, nameDelegate=?, surnameDelegate=?, patronymicDelegate=?, nameCompany=? WHERE idPartner=?`;
    const values = [type, phoneNumber, address, formattedDate, email, nameDelegate, surnameDelegate, patronymicDelegate, nameCompany, idPartner];
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

async function startPartner() {
	app.get("/partners", (req, res) => {
		getPartners().then((results) => {
			res.send(results);
		})
	})
}

startPartner();

module.exports = startPartner

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})