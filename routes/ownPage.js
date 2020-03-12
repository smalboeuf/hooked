const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'session',
  keys: ['hummus', 'pen', 'working'],
  maxAge: 24 * 60 * 60 * 1000
}));

const { profileEditor, myHooks, newPost, getCategories, allHooks, postComments, findUsernameBasedOnId, howManyPeopleLike, getUserInfo, getUserInfoByUsername, avgRatings } = require('../db/helpers')

module.exports = () => {

  router.get("/ownPage", (req, res) => {

    let templateVars = {};
    let posts;
    let commentsPromise = [];
    let postLikesPromise = [];
    let ratingsPromise = [];

    myHooks(req.session.userId.id).then(result => {
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
                if (req.session.userId) {

                  findUsernameBasedOnId(req.session.userId.id).then(
                    user => {
                      getCategories().then(categories => {

                        for (const post of posts) {
                          ratingsPromise.push(avgRatings(post.id));
                        }
                        Promise.all(ratingsPromise).then(
                          avgRatingArray => {

                            templateVars = {
                              id: req.session.userId.id,
                              userPosts: posts,
                              username: postUsername,
                              commentsArray: values,
                              likesArray: postLikes,
                              categories: categories,
                              currentLoggedInUsername: user,
                              avgRatings: avgRatingArray
                            };

                            res.render("ownPage", templateVars);
                          }
                        )
                      }
                      );

                    });
                } else {

                  getCategories().then(categories => {

                    for (const post of posts) {
                      ratingsPromise.push(avgRatings(post.id));
                    }

                    Promise.all(ratingsPromise).then(
                      avgRatingArray => {
                        templateVars = {
                          id: req.session.userId,
                          userPosts: posts,
                          username: postUsername,
                          commentsArray: values,
                          likesArray: postLikes,
                          categories: categories,
                          currentLoggedInUsername: undefined,
                          avgRatings: avgRatingArray
                        };
                        res.render("ownPage", templateVars);
                      }

                    )
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

    const id = req.session.userId.id;
    const { title, description, category_id, content } = req.body;
    newPost(title, description, id, category_id, content).then()

    res.redirect("/ownPage")
  })



  router.get("/editProfile", (req, res) => {

    findUsernameBasedOnId(req.session.userId.id).then( result => {
      const user = result;

      getUserInfo(req.session.userId.id).then(userInfo => {

        const templateVars = { id: req.session.userId, currentLoggedInUsername: user, userInfo: userInfo };

      res.render("editProfile", templateVars);
      })
      }
    );


  });

  router.post("/editProfile", (req, res) => {
    const userId = req.session.userId.id;
    const { username, email, password } = req.body;

    profileEditor(userId, username, email, password)
      .then(() => res.render('editProfile', req.session.userId))

  });


  router.get("/profile/:username", (req, res) => {

    console.log(req.next);

    getUserInfoByUsername(req.params.username).then( userInfo => {

    let templateVars = {};
    let posts;
    let commentsPromise = [];
    let postLikesPromise = [];
    let ratingsPromise = [];


    myHooks(userInfo.id).then(result => {
      posts = result;
      for (const post of posts) {
        commentsPromise.push(postComments(post.id));
      }
      Promise.all(commentsPromise).then(
        values => {
          findUsernameBasedOnId(userInfo.id).then(result => {
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

                        for (const post of posts) {
                          ratingsPromise.push(avgRatings(post.id));
                        }

                        Promise.all(ratingsPromise).then(
                          avgRatingArray => {
                            templateVars = {
                              id: req.session.userId,
                              userPosts: posts,
                              commentsArray: values,
                              likesArray: postLikes,
                              categories: categories,
                              currentLoggedInUsername: user,
                              avgRatings: avgRatingArray
                            };

                            res.render("index", templateVars);
                          }
                        )
                      }
                      );

                    });
                } else {

                  getCategories().then(categories => {


                    for (const post of posts) {
                      ratingsPromise.push(avgRatings(post.id));
                    }

                    Promise.all(ratingsPromise).then(
                      avgRatingArray => {
                        templateVars = {
                          id: req.session.userId,
                          userPosts: posts,
                          username: postUsername,
                          commentsArray: values,
                          likesArray: postLikes,
                          categories: categories,
                          currentLoggedInUsername: undefined,
                          avgRatings: avgRatingArray
                        };
                        console.log(templateVars);
                        res.render("ownPage", templateVars);
                      }
                    )


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

  });

  return router;
};
