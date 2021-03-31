var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cors = require("cors");

var app = express();

const memberRouter = require("./routes/memberRouter");
const postRouter = require("./routes/postRouter");
const statusRouter = require("./routes/statusRouter");
const attendanceRouter = require("./routes/attendanceRouter");
const activityRouter = require("./routes/activityRouter");
const statisticsRouter = require("./routes/statisticsRouter");
const formRouter = require("./routes/formRouter");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(require("./configs/CookieConfig").sign));
app.use(session(require("./configs/SessionConfig")));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/member", memberRouter);
app.use("/api/post", postRouter);
app.use("/api/status", statusRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/activity", activityRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/form", formRouter);

module.exports = app;
