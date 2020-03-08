const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

let users = { id: 1, name: "Alice", email: "alice@email.ca", password: "password" };

module.exports = () => {

  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", (req, res) => {
    if (req.body.email === users.email) {
      user = users;
      req.session['user_id'] = user.id;
    }
    res.render("index");
  });

  return router;
};
