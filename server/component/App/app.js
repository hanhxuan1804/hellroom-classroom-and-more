require("dotenv").config();
global.publicPath = __dirname + "../../public";
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("../passport");
const cors = require("cors");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const fs = require("fs");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const presentationSocket = require("../../socket/presentationSocket");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    exports.db = mongoose.connection;
    console.log("Connection to database successful!");
  })
  .catch((err) => {
    console.log("Connection to database failed!");
    console.log(err);
  });

// // Init gfs
// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// exports.gfs = gfs;

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Passport middleware
app.use(passport.initialize());

require("./router")(app);

const http = require("http");
const server = http.Server(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  const token = socket.handshake.query.token;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET).user;
      if (user) {
        presentationSocket(io, socket, user._id);
      } else {
        console.log("Authentication failed! Disconnecting...");
        socket.disconnect();
      }
    } catch (error) {
      console.log("Authentication failed! Disconnecting...");
      console.log(error);
      socket.disconnect();
    }
  }

  socket.on("send", (message) => {
    socket.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: "Anonymous",
    });
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  // Send a message to the connected client 5 seconds after the connection is created.
  setTimeout(() => {
    socket.emit("message_from_server", `Message: ${Math.random()}`);
  }, 5_000);
});
