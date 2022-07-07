const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./src/routes/users");
dotenv.config();
const PORT = process.env.PORT;
const url = process.env.url;

app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Database is Connected..");
});

app.use(express.json());
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
