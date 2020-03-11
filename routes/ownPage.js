const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

const { profileEditor, myPosts, newPost, getCategories, allHooks, postComments, findUsernameBasedOnId, howManyPeopleLike } = require('../db/helpers')

module.exports = () => {

  router.get("/ownPage", (req, res) => {

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
          findUsernameBasedOnId(1).then(result => {
            const postUsername = result.username;

            for (const post of posts) {
              postLikesPromise.push(howManyPeopleLike(post.id));
            }
            Promise.all(postLikesPromise).then(
              postLikes => {
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
                        res.render("ownPage", templateVars);
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
                    res.render("ownPage", templateVars);
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
    // const templateVars = { id: req.session.userId };
    // res.render("ownPage", templateVars);
  });

  router.post("/ownPage", (req, res) => {
    console.log(req.body.category_id);

    const id = req.session.userId.id;
    const { title, description, category_id, content } = req.body;
    newPost(title, description, id, category_id, content).then()

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
