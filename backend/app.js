var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger/swagger.json");

var mangasRouter = require("./routes/mangas");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/justAnotherList")
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/mangas", mangasRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/m", mangasRouter);

module.exports = app;
