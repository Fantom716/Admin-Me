const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const bp = require("body-parser");
const bodyParser = bp.json();
const moments = require("moment");

const app = express();
const PORT = 5001;

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

app.get("/dashboard/managers", (req, res) => {
    conn.query("SELECT login, email FROM users WHERE role = 'Менеджер'", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})

const statistic = [
    {
        nameTable: "orders",
        fieldInDB: "dateDeadline",
        name: "Заказы",
        currentValue: 0,
        lastValue: 0,
        percentageState: 0,
        image: "card/icons/small card add/hourglass.svg",
        alt: "hourglass"
    },
    {
        nameTable: "sells",
        fieldInDB: "dateSell",
        name: "Продажи",
        currentValue: 0,
        lastValue: 0,
        percentageState: 0,
        image: "card/icons/small card add/basket.svg",
        alt: "basket"
    },
    {
        nameTable: "users",
        fieldInDB: "regDate",
        name: "Пользователи",
        currentValue: 0,
        lastValue: 0,
        percentageState: +0,
        image: "card/icons/small card add/user.svg",
        alt: "users"
    }
]

console.log(statistic);

const selectCount = (res) => {
    let nowDate = new Date();
    nowDate = moments(nowDate).format("YYYY-MM-DD HH:mm:ss");
    console.log(nowDate);
    let startCurrentWeek = moments(nowDate).subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
    console.log(startCurrentWeek);
    let startLastWeek = moments(nowDate).subtract(14, "days").format("YYYY-MM-DD HH:mm:ss");
    console.log(startLastWeek)

    const promises = statistic.map((item) => {
      return new Promise((resolve, reject) => {
        conn.query(`SELECT COUNT(*) as count FROM ${item.nameTable} WHERE ${item.fieldInDB} >= '${startCurrentWeek}' AND ${item.fieldInDB} <= '${nowDate}'`, (err, results) => {
          if (err) {
            reject(err);
          } else {
            item.currentValue = results[0].count;
            resolve();
          }
        });
      });
    });

    const promis = statistic.map((item) => {
      return new Promise((resolve, reject) => {
        conn.query(`SELECT COUNT(*) as count FROM ${item.nameTable} WHERE ${item.fieldInDB} >= '${startLastWeek}' AND ${item.fieldInDB} <= '${startCurrentWeek}'`, (err, results) => {
          if (err) {
            reject(err);
          } else {
            item.lastValue = results[0].count;
            item.percentageState = (((item.currentValue - item.lastValue) / item.lastValue) * 100).toFixed(2);
            console.log(item.percentageSate);
            resolve();
          }
        });
      });
    });

    Promise.all([...promis, ...promises])
      .then(() => {
        console.log(statistic);
        res.send(statistic);
      })
      .catch((err) => {
        console.log(err);
        res.send({ error: `Ошибка парсинга данных. Ошибка: ${err.message}` });
      });
  };

  app.get("/dashboard/statistic", (req, res) => {
    selectCount(res);
  });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})