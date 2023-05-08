const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");
const { nowDate, startLastWeek, startCurrentWeek } = require("../manager/homeManager");
const getRelease = require("./versions");

const app = express();
const PORT = 5021;

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

app.get("/dashboard/admin/infoCard", (req, res) => {
  conn.query("SELECT login, email FROM users WHERE role = 'Администратор'", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const newResult = results.map(({ login, email }) => {
        return {
          title: "Администраторы",
          info: login,
          link: email,
        }
      })
      res.send(newResult);
    }
  })
})

app.get("/dashboard/admin/users", (req, res) => {
  conn.query(`SELECT * FROM users WHERE regDate BETWEEN '${startCurrentWeek}' AND '${nowDate}'`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const newResult = results.map(({ login, regDate }) => {
        return {
          title: login,
          description: moment(regDate).format("DD.MM.YYYY HH:mm:ss"),
          titleRubric: "Последние зарегистрированные пользователи",
        }
      })
      res.send(newResult);
    }
  })
})

const statisticAdmin = [
  {
    nameTable: "users",
    fieldInDB: "regDate",
    name: "Пользователи",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  },
  {
    nameTable: "versions",
    fieldInDB: "versions",
    name: "Версия системы",
    currentValue: 0,
    lastValue: 0,
    image: "/card/icons/small card add/user.svg",
  }
]

async function getStatistic() {
  const query = `SELECT COUNT(*) FROM users WHERE regDate BETWEEN '${startCurrentWeek}' AND '${nowDate}'`
  const query2 = `SELECT COUNT(*) FROM users WHERE regDate BETWEEN '${startLastWeek}' AND '${startCurrentWeek}'`
  return new Promise((resolve, reject) => {
    conn.query(query, (err, results) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        console.log(query)
        statisticAdmin[0]["currentValue"] = results['0']["COUNT(*)"]
        conn.query(`SELECT COUNT(*) FROM users WHERE regDate BETWEEN '${startLastWeek}' AND '${startCurrentWeek}'`, (err, results) => {
          if (err) {
            reject(err);
          } else {
            console.log(query2)
            statisticAdmin[0]["lastValue"] = results['0']["COUNT(*)"]
            statisticAdmin[0]["percentageState"] = Math.round((statisticAdmin[0]["currentValue"] / statisticAdmin[0]["lastValue"]) * 100);
          }
          resolve(statisticAdmin);
        })
      }
    })
  })
}

async function getRateLimit() {
  const response = await axios.get("https://api.github.com/rate_limit");
  return response.data;
}

async function getStatisticAdmin() {
  const releases = await getRelease();

  statisticAdmin[1]["currentValue"] = releases[0]["version"];
  statisticAdmin[1]["lastValue"] = releases[1]["version"];

  getStatistic()

  app.get("/dashboard/admin/statisticCard", (req, res) => {
    res.send(statisticAdmin);
  })
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})

module.exports = getStatisticAdmin;