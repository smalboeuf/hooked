const express = require('express');
const router = express.Router();


module.exports = () => {

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("login", (req, res) => {

    res.render("index");
  });

  return router;
};
