const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 5002;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "FANTOM65265126",
    port: 3306,
})

app.get("/clients", (req, res) => {
    conn.query("SELECT * FROM clients", (err, results) => {
        if (err) console.log(err);
        console.log(results);
        res.send(results);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})