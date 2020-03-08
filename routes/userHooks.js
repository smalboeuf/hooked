const express = require('express');
const router = express.Router();


module.exports = () => {

  router.get("/urls", (req, res) => {
    res.render("index");
  });

  router.post("urls", (req, res) => {

    res.render("index");
  });

  return router;
};
