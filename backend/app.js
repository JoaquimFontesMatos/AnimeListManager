var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger/swagger.json");

var mangasRouter = require("./routes/mangas");
var animesRouter = require("./routes/animes");
var usersRouter = require("./routes/user");
var authRouter = require("./routes/auth");

var mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = encodeURIComponent(process.env.DB_PASS);
const dbName = "justAnotherList";

const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.trmysi4.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.Promise = global.Promise;
mongoose
  .connect(uri)
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const secret = process.env.SECRET;

app.use(
  session({
    secret: secret,
    resave: true, // Set resave to true
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// set up rate limiter: maximum of 15 requests per minute
var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/m", mangasRouter);
app.use("/api/v1/a", animesRouter);
app.use("/api/v1/u", usersRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
