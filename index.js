const express = require("express");
const cors = require("cors");
const router = require("./routes/shopping-routes");
const AppError = require("./utils/app-error");
const errorHandler = require("./utils/error-handler");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", router);
app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT || PORT}`)
);
