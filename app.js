const express = require("express");
const app = express();
const morgan = require("morgan"); // to track the routes requested in console
const bodyParser = require("body-parser"); // to parse the req body data
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

require("dotenv").config(); // to use the details in .env file

/** Import routes */
const authRoutes = require("./routes/api/auth");
const userRoutes = require("./routes/api/user");
const categoryRoutes = require("./routes/api/category");
const productRoutes = require("./routes/api/product");

/** Mongo DB connection */
const connectDB = require("./config/db");
connectDB();

/** Middlewares */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

/** Routes Middleware */
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 8000;

/** Server */
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
