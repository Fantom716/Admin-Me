const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const { nowDate, startCurrentWeek, startLastWeek } = require('../manager/homeManager');

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

app.get("/dashboard/clients/products", (req, res) => {
    conn.query("SELECT nameProduct, descriptionProduct FROM products", (err, results) => {
      if (err) {
        console.log(err);
      } else {
        const newResults = results.map(({nameProduct, descriptionProduct, ...rest}) => {
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
      percentageState: 0,
      image: "/card/icons/small card add/user.svg",
      alt: "users"
    },
    {
      nameTable: "orders",
      fieldInDB: "manager",
      name: "Любимый менеджер",
      currentValue: 0,
      lastValue: 0,
      percentageState: 0,
      image: "/card/icons/small card add/user.svg",
      alt: "details"
    }
  ];

  function getStaticUser() {
    return new Promise((resolve, reject) => {
      let nameTable, fieldInDB, currentValue, lastValue, percentageState = "";

      statisticUser.map((item) => {
        nameTable = item.nameTable;
        fieldInDB = item.fieldInDB;
        currentValue = item.currentValue;
        lastValue = item.lastValue;
        percentageState = item.percentageState;
      });

      conn.query("SELECT COUNT(*) FROM orders WHERE client = 8211", (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        } else {
          // console.log(statisticUser[0].currentValue = results[0]["COUNT(*)"]);
        }

        conn.query(`SELECT COUNT(*) FROM orders WHERE dateDeadline BETWEEN '${startLastWeek}' and '${startCurrentWeek}' AND client = 8211`, (err1, results1) => {
          if (err1) {
            console.log(err1);
            reject(err1);
            return;
          } else {
            statisticUser[0].lastValue = results1[0]["COUNT(*)"];
            statisticUser[0].percentageState = Math.round(((statisticUser[0].currentValue - statisticUser[0].lastValue) / statisticUser[0].lastValue) * 100);
          }
        });

        conn.query(`SELECT rating FROM clients WHERE idClient = 8211`, (err2, results2) => {
          if (err2) {
            console.log(err2);
            reject(err2);
            return;
          } else {
            statisticUser[1].currentValue = results2[0]["rating"];
            statisticUser[1].lastValue = 5
            statisticUser[1].percentageState = Math.round(((statisticUser[1].currentValue - statisticUser[1].lastValue) / statisticUser[1].lastValue) * 100);
            resolve(statisticUser);
          }
        });

        conn.query(`SELECT manager, MAX(dateDeadline) FROM orders WHERE client = 12686 GROUP BY manager`, (err3, results3) => {
          if (err3) {
            console.log(err3);
            reject(err3);
            return;
          } else {
            statisticUser[2].lastValue = results3[0]["manager"];
            statisticUser[2].percentageState = 0;
            // console.log(statisticUser);
            resolve(statisticUser);
          }
        })

        conn.query(`SELECT manager, COUNT(manager) FROM orders WHERE dateDeadline BETWEEN '${startLastWeek}' and '${startCurrentWeek}' AND client = 12686 GROUP BY manager`, (err3, results3) => {
          if (err3) {
            console.log(err3);
            reject(err3);
            return;
          } else {
            statisticUser[2].currentValue = results3[0]["manager"];
            statisticUser[2].percentageState = Math.round(((statisticUser[2].currentValue - statisticUser[2].lastValue) / statisticUser[2].lastValue) * 100);
            resolve(statisticUser);
          }
        })
      });
    });
  }

  app.get("/dashboard/users/statisticCard", (req, res) => {
    getStaticUser()
      .then((staticUser) => res.send(staticUser))
      .catch((err) => console.log(err));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
