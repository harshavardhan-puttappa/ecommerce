const mongoose = require("mongoose");
const config = require("config");
const dburl = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true, // to use new monitoring engine
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
