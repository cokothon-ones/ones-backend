const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { sequelize } = require("./models/index.js");
const response = require("./config/response.js");
const status = require("./config/response.status.js");
const BaseError = require("./config/error.js");

dotenv.config();

// 로그인 관련
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
passportConfig();

// routes 불러오기
const authRouter = require("./routes/auth.route.js");

const app = express();

app.set("port", process.env.PORT || 3000);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

app.use((req, res, next) => {
  const err = new BaseError(status.NOT_FOUND);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.err = process.env.NODE_ENV !== "production" ? err : {};
  res
    .status(err.data.status || status.INTERNAL_SERVER_ERROR)
    .send(response(err.data));
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});
