const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");
const { startLastWeek, startCurrentWeek } = require("../manager/homeManager");

const app = express();
const PORT = 5023;

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

let githubData;
let versions = [];

async function getRelease() {
  try {
    if (githubData) {
      // Если мы уже загрузили данные из GitHub, то просто возвращаем их
      return versions = githubData.map(release => {
        return {
          version: release.tag_name,
          date: moment(release.published_at).format("DD.MM.YYYY"),
          link: release.html_url,
          author: release.author.login,
          description: release.body === "" ? "Нет описания" : release.body,
        }
      });
    }

    // Если мы еще не загрузили данные из GitHub, то загружаем их и сохраняем
    const response = await axios.get("https://api.github.com/repos/OwlCarousel2/OwlCarousel2/releases");
    githubData = response.data;
    versions = githubData.map(release => {
      return {
        version: release.tag_name,
        date: moment(release.published_at).format("DD.MM.YYYY"),
        link: release.html_url,
        author: release.author.login,
        description: release.body === "" ? "Нет описания" : release.body,
      }
    });
    console.log()

    return versions;
  }
  catch (err) {
    console.log("Ошибка:", err);
  }
}

async function getRateLimit() {
  const response = await axios.get("https://api.github.com/rate_limit");
  return response.data;
}

app.get("/admin/versions", (req, res) => {
  getRelease().then((realese) => {
    res.send(realese)
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})

module.exports = getRelease;