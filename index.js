const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connection = require("./config/database");
const register = require("./routes/register");
const login = require("./routes/login");
const post = require("./routes/post");
const user = require("./routes/user");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth/register", register);
app.use("/auth/login", login);
app.use("/posts", post);
app.use("/user", user);

connection.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
