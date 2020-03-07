const express = require('express');
const router = express.Router();


module.exports = () => {

  router.get("/url", (req, res) => {
    res.render("index");
  });

  router.post("/url", (req, res) => {

    res.render("index");
  });

  return router;
};
