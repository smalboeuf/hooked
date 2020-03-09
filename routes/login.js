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
    templateVars = { id: req.session.userId };
    res.render("index", templateVars);
  });

  router.get("/login", (req, res) => {
    let templateVars = { id: req.session.userId };
    res.render("login", templateVars);
  });

  router.post("/login", (req, res) => {
<<<<<<< HEAD
    const { email, password } = req.body;

    correctPassword(email, password)
      .then(() => correctEmail(email))
      .then((result) => {
        console.log(result);
        req.session.userId = result;
        res.redirect("/")
      })
      .catch(e => res.send(e));
    ;
=======
    const {email, password} = req.body;
    const logInErrMsg = 'Please enter valid email and/or password'

    if (email === '' || password === '') {
      console.log('validation')
      res.send(logInErrMsg)
    } else {
      correctPassword(email, password)
      .then(pwdCheck => {
          if (pwdCheck === true) {
            correctEmail(email)
              .then(result => {
                req.session.userId = result;
                res.redirect('/');
              });
          } else {
            res.send(logInErrMsg);
          }
        })
        .catch(e => res.send(e));
    }
>>>>>>> 663c630528906335ba577c374875e458ac5c9252
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  return router;
};
