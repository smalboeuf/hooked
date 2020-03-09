const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const db = require('../db');

const { correctEmail } = require('../db/helpers')

// const correctPassword = function(email, password) {
//   const queryStr = `
//     SELECT password
//     FROM users
//     WHERE email = $1
//   `
// return db.query(queryStr, [email])
//   .then(res => {res.send(bcrypt.compareSync(password, res.rows))
//   return res;})

//   .catch(() => res.send('not working at func'))


// };

// const correctEmail = function(email) {
//   const queryStr = `
//     SELECT *
//     FROM users
//     WHERE email = $1
//   `
//   return db.query(queryStr, [email])
//     .then(res => res.rows)
//     .catch(() => false)
// };


router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

// let users = { id: 1, name: "Alice", email: "alice@email.ca", password: "password" };

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

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const queryStr = `
    SELECT password
    FROM users
    WHERE email = $1
    `

return db.query(queryStr, [email])
  .then(result => res.send(result.rows[0]))
  // .catch(e => res.send(e))



    // correctPassword(email, password)
    //   .then(res => res.send(res))
      // .then(res => (correctEmail(email)))
      // .then(user => {
      //   if (!user) {
      //     res.send({error: "error"});
      //     return;
      //   }
      //   req.session.userId = user.id;
      //   res.send({user: {name: user.name, email: user.email, id: user.id}});
      // })
      // .catch(e => res.send('login nogo'));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  return router;
}
