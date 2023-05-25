const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");
const { nowDate, startLastWeek, startCurrentWeek } = require("../manager/homeManager");
const getRelease = require("./versions");
const cors = require("cors");
const conn = require("../utils/connectionDB");

const app = express();
const PORT = 5021;

app.use(cors());

app.get("/dashboard/admin/users", (req, res) => {
  conn.query(`SELECT * FROM users WHERE regDate BETWEEN '${startCurrentWeek}' AND '${nowDate}'`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      let newResult;
      if (results.length > 0) {
        newResult = results.map(({ login, regDate }) => {
          return {
            title: login,
            description: moment(regDate).format("DD.MM.YYYY HH:mm:ss"),
            titleRubric: "Последние зарегистрированные пользователи",
          }
        })
      }
      else {
        newResult = ["Новых пользователей нет"]
      }
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

async function getStatisticAdmin() {
  const releases = await getRelease();

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
      currentValue: releases[0]["version"],
      lastValue: releases[1]["version"],
      image: "/card/icons/small card add/user.svg",
    }
  ];

  const statistic = await getStatistic();
  statisticAdmin[0]["currentValue"] = statistic[0]["currentValue"];
  statisticAdmin[0]["lastValue"] = statistic[0]["lastValue"];
  statisticAdmin[0]["percentageState"] = statistic[0]["percentageState"];

  return statisticAdmin;
}

app.get("/dashboard/admin/statisticCard", async (req, res) => {
  try {
    const statisticAdmin = await getStatisticAdmin();
    res.send(statisticAdmin);
  } catch (err) {
    console.log(err);
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

module.exports = getStatisticAdmin;
