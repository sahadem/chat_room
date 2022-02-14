let mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "chat_room",
  
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = con;
