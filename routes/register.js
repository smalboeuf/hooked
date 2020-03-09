const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));


const { addUser } = require('../db/helpers');

module.exports = () => {

  router.get("/register", (req, res) => {
    let templateVars = { id: req.session.user_id };
    res.render("register", templateVars);
  });

  router.post("/register", (req, res) => {

    const { username, email, password } = req.body;

    addUser(username, email, password)

      .then()

    res.redirect("/");
  });

  return router;
};
