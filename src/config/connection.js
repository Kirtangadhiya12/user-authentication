const mongoose = require("mongoose");
const url = process.env.url;

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database is Connected..");
});
