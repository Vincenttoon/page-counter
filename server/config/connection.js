const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PageCounter",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove useCreateIndex and useFindAndModify options
  }
);

module.exports = mongoose.connection;
