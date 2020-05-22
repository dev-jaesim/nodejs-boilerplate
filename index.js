const express = require("express");
const app = express();
const port = 5000;

require("dotenv").config();
let db_password = process.env.DB_PW;

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://jaesim:${db_password}@boilerplate-fb65q.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
