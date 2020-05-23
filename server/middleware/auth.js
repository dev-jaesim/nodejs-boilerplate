const { User } = require("../models/User");

let auth = (req, res, next) => {
  // get a token from cookie
  let token = req.cookies.x_auth;

  // decrypt the token
  User.findByToken(token, (err, user) => {
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
  // find a user
};

module.exports = { auth };
