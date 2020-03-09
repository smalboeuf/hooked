const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

const { correctEmail, correctPassword } = require('../db/helpers')

module.exports = () => {

  router.get("/", (req, res) => {
    let templateVars = {}
     templateVars = {id: req.session.userId};

     console.log(req.session);
    res.render("index", templateVars);
  });

  router.get("/login", (req, res) => {
    let templateVars = {id: req.session.userId};
    res.render("login", templateVars);
  });

  router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const logInErrMsg = 'Please enter valid email and/or password'

    if (email === '' || password === '') {
      res.send(logInErrMsg)
    } else {
      correctPassword(email, password)
        .then(pwdCheck => {
          pwdCheck ? correctEmail(email) : res.send(logInErrMsg);
        })
        .then((emailCheck) => {
          if (emailCheck) {
            req.session.userId = emailCheck;
            res.redirect("/");
          } else {
            res.send(logInErrMsg);
          }
        })
        .catch(e => res.send(e));
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  return router;
};
