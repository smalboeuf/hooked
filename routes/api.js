const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));


const { myPosts, newPost, postComments, findUsernameBasedOnId, howManyPeopleLike } = require('../db/helpers');

module.exports = () => {

  router.get("/user/:userid/posts", (req, res) => {
    myPosts(req.params.userid).then(result => {
      res.send(result);
    });
  });

  router.get("/user/:userid/newPost", (req, res) => {
    newPost(req.params.userid).then(result => {
      res.send(result);
    });
  })

  router.get("/user/:postid/comments", (req, res) => {
    postComments(req.params.postid).then(result => {
      res.send(result);
    })
  });

  router.get("/user/:userId", (req, res) => {
    findUsernameBasedOnId(req.params.userId).then(result => {
      res.send(result);
    })
  });

  router.get("/:postid/likes", (req, res) => {
    howManyPeopleLike(req.params.postid).then(result => {
      res.send(result);
    })
  });

  router.post("/:postid/increaseLikes", (req, res) => {


  });

  // router.post("/getCookie/", (req, res) => {

  //   res.send(req.session.userId.id);
  // });

  //Implement loading user into their page

  router.get("/:username", (req, res) => {

  });



  return router;
}
