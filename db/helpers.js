const db = require('/db');

const howManyPeopleLike = function(hookId) {
  const queryStr = `
    SELECT COUNT(like.*) AS likes
    FROM likes
    WHERE hook_id = $1
  `
  db.query(queryStr, [hookId])
    .then(res => res.rows[0])
    .catch(() => null)
};
exports.howManyPeopleLike = howManyPeopleLike;

const avgRatings = function(hookId) {
  const queryStr = `
    SELECT AVG(ratings) AS rating
    FROM ratings
    WHERE hook_id = $1
  `
  db.query(queryStr, [hookId])
    .then(res => res.rows[0])
    .catch(() => null)
};
exports.avgRatings = avgRatings;

const myLikes = function(userId) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    JOIN likes ON likes.user_id = hooks.user_id
    WHERE likes.user_id = $1
  `
  db.query(queryStr, [userId])
    .then(res => res.rows)
    .catch(() => null)
}
exports.myLikes = myLikes;

const myPosts = function(userId) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    WHERE user_id = $1
  `
  db.query(queryStr, [userId])
    .then(res => res.rows)
    .catch(() => null)
};
exports.myPosts = myPosts;

const search = function(whatAUserIsLookingFor) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    WHERE content LIKE $1
    OR title LIKE $1
  `
  db.query(queryStr, [whatAUserIsLookingFor])
    .then(res => res.rows)
};
exports.search = search;

const rateTheHook = function(hookId, rating) {

  const queryStr = `
    INSERT INTO ratings (hook_id, rating)
    VALUES ($1, $2)
    RETURNING *;
  `
  return db.query(queryStr, [hookId, rating])
  .then(res => res.rows)
  .catch(() => null)
};
exports.rateTheHook = rateTheHook;

// const isAnExistingUser = function() {}
