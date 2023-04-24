const moments = require("moment");
const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

exports.getData = function(query, field) {
    return new Promise((resolve, reject) => {
      conn.query(query, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          results.map(element => {
            element[field] = moments(element[field]).format("YYYY-MM-DD HH:mm:ss");
          });
          console.log(results[0]);
          resolve(results);
        }
      });
    });
  };