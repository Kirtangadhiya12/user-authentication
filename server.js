const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./src/routes/users");
dotenv.config();
require("./src/config/connection");
const PORT = process.env.PORT;
app.use(express.static(`${__dirname}/uploads`));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
