const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

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