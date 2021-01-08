const express = require("express");
const app = express();
const morgan = require("morgan"); // to track the routes requested in console
const bodyParser = require("body-parser"); // to parse the req body data
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

require("dotenv").config(); // to use the details in .env file

/** Import routes */
const authRoutes = require("./routes/api/auth");
const userRoutes = require("./routes/api/user");

/** Mongo DB connection */
const connectDB = require("./config/db");
connectDB();

/** Middlewares */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

/** Routes Middleware */
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 8000;

/** Server */
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
