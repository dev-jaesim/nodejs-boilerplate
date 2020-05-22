const express = require("express");
const app = express();
const port = 5000;
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();
let db_uri = process.env.DB_URI;

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/user/register", (req, res) => {
  // add information from the clien to the DB
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    } else {
      res.status(200).json({
        success: true,
        userInfo,
      });
    }
  });
});

app.post("/api/user/login", (req, res) => {
  // find the entered email from db
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "no email matched",
      });
    }

    // compare the entered pw and stored pw
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "password different",
        });
      }
    });
    // create a token if everything is correct
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      // store the created token into cookie
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    });
  });
});

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    img: req.user.image,
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
