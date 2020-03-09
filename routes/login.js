const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

// let users = { id: 1, name: "Alice", email: "alice@email.ca", password: "password" };

const { correctEmail, correctPassord } = require('../db/helpers')

module.exports = () => {

  router.get("/", (req, res) => {
    let templateVars = {}
     templateVars = {id: req.session.user_id};

    res.render("index", templateVars);
  });

  router.get("/login", (req, res) => {
    let templateVars = {id: req.session.user_id};
    res.render("login", templateVars);
  });

  // router.get("/login/:id", (req, res) => {
  //   if (req.body.email === users.email) {
  //     user = users;
  //   }
  //   req.session.user_id = req.params.id;
  //   res.redirect("/urls");
  // });

  router.post("/login", (req, res) => {
    const {email, password} = req.body;

    correctPassord(email, password)
      .then(() => correctEmail(email))
      .then((result) => {
        req.session.userId = result;
        res.redirect("/")})
      .catch(e => res.send(e))
    ;
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  return router;
};
