const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
// const bcrypt = require('bcrypt');


module.exports = () => {
  router.use(cookieSession({
    name: 'session',
    keys: ['hummus', 'pen', 'working'],
    maxAge: 24 * 60 * 60 * 1000
  }));

  router.get("/login", (req, res) => {
    res.render("login");
  })

  router.get("/login/id", (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect("/");
  });

  return router;
};
