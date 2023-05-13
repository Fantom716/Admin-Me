const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

const app = express();
const PORT = 5002;

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

const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
const startCurrentWeek = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
const startLastWeek = moment().subtract(14, "days").format("YYYY-MM-DD HH:mm:ss");

app.get("/dashboard/clients/products", (req, res) => {
  conn.query("SELECT nameProduct, descriptionProduct FROM products", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const newResults = results.map(({ nameProduct, descriptionProduct, ...rest }) => {
        return {
          ...rest,
          title: nameProduct,
          description: descriptionProduct,
          titleRubric: "Наши продукты"
        };
      });
      res.send(newResults);
    }
  });
});

const user = 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});