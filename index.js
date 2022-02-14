const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const con = require("./database");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("socket.on => chat message ==>", msg);

    let values = [];
    for (let [key, value] of Object.entries(msg)) {
      values.push("'" + value.toString() + "'");
    }

    console.log("values =>", values.toString());

    let query =
      "INSERT INTO messages(message, sender_id, receiver_id, created_at) VALUES (" +
      values +
      ")";

    console.log("query =>", query);
    con.query(query, (err, result, fields) => {
      console.log("query => result ==>", result);
    });

    io.emit("chat message", msg);
    console.log("io.emit => chat message ==>", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
