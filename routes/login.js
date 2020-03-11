const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

const { allHooks, correctEmail, correctPassword, myPosts, findUsernameBasedOnId, postComments, howManyPeopleLike, getCategories } = require('../db/helpers');

module.exports = () => {

  router.get("/", (req, res) => {
    let templateVars = {};
    let posts;
    let commentsPromise = [];
    let postLikesPromise = [];

    allHooks().then(result => {
      posts = result;
      for (const post of posts) {
        commentsPromise.push(postComments(post.id));
      }
      Promise.all(commentsPromise).then(
        values => {
          findUsernameBasedOnId(req.session.userId.id).then(result => {
            const postUsername = result.username;

            for (const post of posts) {

              postLikesPromise.push(howManyPeopleLike(post.id));
            }
            Promise.all(postLikesPromise).then(
              postLikes => {

                for (let i = 0; i < postLikes.length; i++){
                  if (!postLikes[i]) {
                    postLikes[i] = 0;
                  } else {
                    postLikes[i] = postLikes[i].love;
                  }
                }
                console.log(postLikes);


                if (req.session.userId) {

                  findUsernameBasedOnId(req.session.userId.id).then(
                    user => {
                      getCategories().then(categories => {
                        templateVars = {
                          id: req.session.userId,
                          userPosts: posts,
                          username: postUsername,
                          commentsArray: values,
                          likesArray: postLikes,
                          categories: categories,
                          currentLoggedInUsername: user
                        };
                        res.render("index", templateVars);
                      }
                      );

                    });
                } else {

                  getCategories().then(categories => {
                    templateVars = {
                      id: req.session.userId,
                      userPosts: posts,
                      username: postUsername,
                      commentsArray: values,
                      likesArray: postLikes,
                      categories: categories,
                      currentLoggedInUsername: undefined
                    };
                    res.render("index", templateVars);
                  }
                  );
                }
              }
            );
          }
          );
        }
      );

    }
    );
  });


  router.get("/login", (req, res) => {
    let templateVars = { id: req.session.userId };
    res.render("login", templateVars);
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const logInErrMsg = 'Please enter valid email and/or password';

    if (email === '' || password === '') {
      console.log('validation');
      res.send(logInErrMsg);
    } else {
      correctPassword(email, password)
        .then(pwdCheck => {
          if (pwdCheck === true) {
            correctEmail(email)
              .then(result => {
                req.session.userId = result;
                res.redirect('/');
              });
          } else {
            res.send(logInErrMsg);
          }
        })
        .catch(e => res.send(e));
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  return router;
};
