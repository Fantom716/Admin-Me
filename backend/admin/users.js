const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

const app = express();
const PORT = 5022;

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

async function getUsers() {
    return new Promise((resolve, reject) => {
        conn.query("SELECT login, email, role, regDate FROM users", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                result = result.map(({ login, email, role, regDate }) => {
                    return { login, email, role, regDate: moment(regDate).format("YYYY-MM-DD HH:mm:ss") }
                })
                resolve(result);
            }
        })
    })
}

app.get("/admin/users", (req, res) => {
    getUsers().then((result) => {
        res.send(result);
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

module.exports = getUsers;