const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const cors = require("cors");
const conn = require("../utils/connectionDB");

const app = express();
const PORT = 5022;

app.use(cors());

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
    console.log(`Server started on port ${PORT}`);
})

module.exports = getUsers;
