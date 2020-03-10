const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

const { profileEditor, myPosts, newPost } = require('../db/helpers')

module.exports = () => {

  router.get("/ownPage", (req, res) => {

    const templateVars = { id: req.session.userId };
    res.render("ownPage", templateVars);
  });

  router.post("/ownPage", (req, res) => {

    const id = req.session.userId.id;
    const { title, description, content } = req.body;

    newPost(title, description, id, content).then()

    res.redirect("/ownPage")
  })

  router.get("/editProfile", (req, res) => {
    const templateVars = { id: req.session.userId };

    res.render("editProfile", templateVars);
  });

  router.post("/editProfile", (req, res) => {
    const userId = req.session.userId.id;
    const { username, email, password } = req.body;

    profileEditor(userId, username, email, password)
      .then(() => res.render('editProfile', req.session.userId))

  });

  return router;
};
