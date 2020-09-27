const express = require("express");
const app = express();
const morgan = require("morgan"); // to track the routes requested in console
const bodyParser = require("body-parser"); // to parse the req body data
const cookieParser = require("cookie-parser");
require("dotenv").config(); // to use the details in .env file

/** Import routes */
const userRoutes = require("./routes/api/user");

/** Mongo DB connection */
const connectDB = require("./config/db");
connectDB();

/** Middlewares */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

/** Routes Middleware */
app.use("/api", userRoutes);

const PORT = process.env.PORT || 8000;

/** Server */
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
