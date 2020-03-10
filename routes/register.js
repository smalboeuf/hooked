const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));


const { addUser, isAnExistingUser } = require('../db/helpers');

module.exports = () => {

  router.get("/register", (req, res) => {
    let templateVars = { id: req.session.user_id };
    res.render("register", templateVars);
  });

  router.post("/register", (req, res) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const emptyFields = "Please fill all registration fields"

    const existingUser = 'That email already exists.  Please login or register with another email';
    // console.log(username)
    // console.log(email)

    if (username === '' || email === '' || password === '') {
      res.send(emptyFields);
    } else {

      // isAnExistingUser(username, email)
      // .then(result => console.log('after', result))
      // .then(userCheck => {
      //   console.log(userCheck)
      //   if (userCheck === true) {

      //     res.send(existingUser);

      //   } else {

      addUser(username, email, hashedPassword)
        .then()

      res.redirect("/");
    }
    // });
    // .catch (e => res.send(e));
    // }
  });

  return router;
};
