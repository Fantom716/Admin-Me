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
      results.forEach((result) => {
        result.info = result.login;
        delete result.login;
        result.link = result.email;
        delete result.email;
      });
      [...results] = [...results, {"NameCard": "Менеджеры"} ];
      res.send(results);
    }
  });
});

app.get("/dashboard/clients/products", (req, res) => {
  conn.query("SELECT nameProduct, descriptionProduct FROM products", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      results.forEach((result) => {
        result.title = result.nameProduct;
        delete result.nameProduct;
        result.description = result.descriptionProduct;
        delete result.descriptionProduct;
      })
      res.send(results);
    }
  });
})

app.get("/dashboard/manager/orders", (req, res) => {
  conn.query("SELECT composition, status FROM orders WHERE status = 'В процессе' OR status = 'В ожидании'", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      results.forEach((result) => {
        result.title = result.composition;
        delete result.composition;
        result.description = result.status;
        delete result.status;
      })
      res.send(results);
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

const statisticAdmin = [
  {
    nameTable: "users",
    fieldInDB: "idUser",
    name: "Пользователи",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  }
]
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

const nowDate = new Date();
const startCurrentWeek = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
const startLastWeek = moment().subtract(14, "days").format("YYYY-MM-DD HH:mm:ss");

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

    conn.query("SELECT COUNT(*) FROM orders WHERE client = 5510", (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      } else {
        statisticUser[0].currentValue = results[0]["COUNT(*)"];
      }

      conn.query(`SELECT COUNT(*) FROM orders WHERE dateDeadline BETWEEN '${startLastWeek}' and '${startCurrentWeek}' AND client = 5510`, (err1, results1) => {
        if (err1) {
          console.log(err1);
          reject(err1);
          return;
        } else {
          statisticUser[0].lastValue = results1[0]["COUNT(*)"];
          console.log(statisticUser);
          statisticUser[0].percentageState = Math.round(((statisticUser[0].currentValue - statisticUser[0].lastValue) / statisticUser[0].lastValue) * 100);

        }
      });

      conn.query(`SELECT rating FROM clients INNER JOIN orders ON clients.idClient = orders.Client WHERE idClient = 5510 AND dateDeadline BETWEEN '${startLastWeek}' and '${startCurrentWeek}'`, (err2, results2) => {
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

      conn.query(`SELECT manager, MAX(dateDeadline) FROM orders WHERE client = 5510 GROUP BY manager`, (err3, results3) => {
        if (err3) {
          console.log(err3);
          reject(err3);
          return;
        } else {
          statisticUser[2].lastValue = results3[0]["manager"];
          statisticUser[2].percentageState = 0;
          console.log(statisticUser);
          resolve(statisticUser);
        }
      })

      conn.query(`SELECT manager, COUNT(manager) FROM orders WHERE dateDeadline BETWEEN '${startLastWeek}' and '${startCurrentWeek}' AND client = 5510 GROUP BY manager`, (err3, results3) => {
        if (err3) {
          console.log(err3);
          reject(err3);
          return;
        } else {
          console.log(results3)
          statisticUser[2].currentValue = results3[0]["manager"];
          statisticUser[2].percentageState = Math.round(((statisticUser[2].currentValue - statisticUser[2].lastValue) / statisticUser[2].lastValue) * 100);
          resolve(statisticUser);
        }
      })
    });
  });
}



function getStatisticManagerAndAdmin(arrayList) {
  const promises = arrayList.map((item) => {
    const query = `SELECT COUNT(*) as count FROM ${item.nameTable}`;
    const query1 = `SELECT COUNT(*) as count FROM ${item.nameTable} WHERE ${item.fieldInDB} BETWEEN '${startLastWeek}' AND '${startCurrentWeek}'`;


    return new Promise((resolve) => {
      conn.query(query, (err, result) => {
        if (err) {
          console.log(err);
          resolve();
        } else {
          item.currentValue = result[0].count;
          conn.query(query1, (err1, result1) => {
            if (err1) {
              console.log(err1);
              resolve();
            } else {
              item.lastValue = result1[0].count;
              item.percentageState = Math.round(((item.currentValue - item.lastValue) / item.lastValue) * 100);
              console.log(item);
              resolve();
            }
          });
        }
      });
    });
  });

  return Promise.all(promises).then(() => arrayList);
}

app.get("/dashboard/managers/statisticCard", (req, res) => {
  getStatisticManagerAndAdmin(statisticManager)
    .then((arrayList) => res.send(arrayList))
    .catch((err) => console.log(err));
});

app.get("/dashboard/users/statisticCard", (req, res) => {
  getStaticUser()
    .then((staticUser) => res.send(staticUser))
    .catch((err) => console.log(err));
});

app.get("/dashboard/admin/statisticCard", (req, res) => {
  getStatisticManagerAndAdmin(statisticAdmin)
    .then((statisticAdmin) => res.send(statisticAdmin))
    .catch((err) => console.log(err));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
