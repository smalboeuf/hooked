const express = require('express');
const router = express.Router();



module.exports = () => {

  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("register", (req, res) => {

    res.render("index");
  });

  return router;
};
