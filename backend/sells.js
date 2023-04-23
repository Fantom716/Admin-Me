const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 5004;

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

app.get("/sells", (req, res) => {
    conn.query("SELECT * FROM sells", (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})