const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

const app = express();
const PORT = 5001;

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

app.get("/dashboard/managers/infoCard", (req, res) => {
  conn.query("SELECT login, email FROM users WHERE role = 'Менеджер'", (err, results) => {
    if (err) {
      console.log(err);
    } else {
        const newResults = results.map(({login, email}) => {
          return {
            title: "Менеджеры",
            info: login,
            link: email,
          };
        });
        res.send(newResults);
      }
  });
});

app.get("/dashboard/manager/orders", (req, res) => {
  conn.query("SELECT composition, status FROM orders WHERE status = 'В процессе' OR status = 'В ожидании'", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const newResults = results.map(({composition, status}) => {
        return {
          title: composition,
          description: status,
          titleRubric: "Необработанные заказы"
        };
      })
      res.send(newResults);
    }
  })
})

const statisticManager = [
  {
    nameTable: "orders",
    fieldInDB: "dateDeadline",
    name: "Заказы",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/hourglass.svg",
    alt: "hourglass"
  },
  {
    nameTable: "sells",
    fieldInDB: "dateSell",
    name: "Продажи",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/basket.svg",
    alt: "basket"
  },
  {
    nameTable: "users",
    fieldInDB: "regDate",
    name: "Пользователи",
    currentValue: 0,
    lastValue: 0,
    percentageState: +0,
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  }
];

const statisticUser = [
  {
    nameTable: "orders",
    fieldInDB: "client",
    name: "Количество заказов",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/hourglass.svg",
    alt: "hourglass"
  },
  {
    nameTable: "clients",
    fieldInDB: "rating",
    name: "Рейтинг",
    currentValue: 0,
    lastValue: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  },
];

const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
const startCurrentWeek = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
const startLastWeek = moment().subtract(14, "days").format("YYYY-MM-DD HH:mm:ss");

function getStatisticManager(arrayList) {
  const promises = arrayList.map((item) => {
    const queryCurrentValue = `SELECT COUNT(*) as count FROM ${item.nameTable} WHERE ${item.fieldInDB} BETWEEN '${startCurrentWeek}' AND '${nowDate}'`;
    const queryLastValue = `SELECT COUNT(*) as count FROM ${item.nameTable} WHERE ${item.fieldInDB} BETWEEN '${startLastWeek}' AND '${startCurrentWeek}'`;

    return new Promise((resolve) => {
      conn.query(queryCurrentValue, (err, result) => {
        if (err) {
          console.log(err);
          resolve();
        } else {
          item.currentValue = result[0].count;
          conn.query(queryLastValue, (err1, result1) => {
            if (err1) {
              console.log(err1);
              resolve();
            } else {
              item.lastValue = result1[0].count;
              item.percentageState = Math.round(((item.currentValue - item.lastValue) / item.lastValue) * 100);
              resolve();
            }
          });
        }
      });
    });
  });

  return Promise.all(promises).then(() => arrayList);
}

async function startStat() {
  await getStatisticManager(statisticManager);
}

app.get("/dashboard/managers/statisticCard", (req, res) => {
  console.log(statisticManager)
  getStatisticManager(statisticManager)
  .then((arrayList) => res.send(arrayList))
  .catch((err) => console.log(err));
});

async function statUser() {
  await getStatisticManager(statisticUser)
}

app.get("/dashboard/clients/statistics"), (req, res) => {
  console.log(statisticUser)
  getStatisticManager(statisticUser)
  .then((arrayList) => res.send(arrayList))
  .catch((err) => console.log(err));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  nowDate,
  startCurrentWeek,
  startLastWeek,
  startStat,
  statUser
}