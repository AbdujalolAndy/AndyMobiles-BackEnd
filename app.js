const express = require("express");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");
const express_session = require("express-session");
const MongoDb_store = require("connect-mongodb-session")(express_session);
const router_bssr = require("./router_bssr");
const router_bssp = require("./router_bssp");
const jwt = require("jsonwebtoken");
const NotificationModel = require("./schema/notificationSchema");

const store = new MongoDb_store({
  uri: process.env.MONGODB_URL,
  collection: "Session",
});

//middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//sessions
app.use(
  express_session({
    secret: process.env.SECRET_COOKIE,
    store: store,
    cookie: {
      maxAge: 60 * 1000 * 30,
    },
    resave: true,
    saveUninitialized: true,
  })
);
//view engine
app.set("./views", "./views");
app.set("view engine", "ejs");

//router
app.use("/admin", router_bssr);
app.use("/", router_bssp);

const server = http.createServer(app);
const io = require("socket.io")(server);
//SOCKET IO
const people={};
io.on("connection", (socket) => {
  const token = socket.handshake.headers.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("access_token="))
    .split("=")[1];
  const member = jwt.verify(token, process.env.SECRET_TOKEN);
  console.log("User connected", member.mb_nick);
  people[member.mb_nick]=socket

  const clientId = member.mb_nick;
  socket.clientId = clientId;

  socket.on("privateMessage", async (data) => {
    const { targetClientId, message, sender_image } = data;
    const notification = new NotificationModel({
      notify_sender:clientId,
      notify_sender_image:sender_image?? "/icons/default_user.svg",
      notify_reciever:targetClientId,
      notify_context:message
    })
    if (targetClientId) {
      people[targetClientId].emit("privateMessage", {
        senderClientId: clientId,
        message,
      });
      await notification.save()
    } else {
      socket.emit("errorMessage", { text: "Target client not found." });
    }

  });
  socket.on("disconnect", () => {
  });
});

module.exports = server;
