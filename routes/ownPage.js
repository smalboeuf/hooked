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

  router.get("/ownPage", (req, res) => {
    const templateVars = {id: req.session.user_id};
    res.render("ownPage", templateVars);
  });

  router.get("/editProfile", (req, res) => {
    const templateVars = {id: req.session.user_id};

    res.render("editProfile", templateVars);
  });

  return router;
};
