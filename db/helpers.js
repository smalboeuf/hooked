const db = require('./index');


const howManyPeopleLike = function(hookId) {
  const queryStr = `
    SELECT COUNT(like.*) AS likes                 //shows # of likes of a hook
    FROM likes
    WHERE hook_id = $1
  `
  db.query(queryStr, [hookId])
    .then(res => res.rows[0])
    .catch(() => null)
};
// exports.howManyPeopleLike = howManyPeopleLike;

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
// exports.avgRatings = avgRatings;

const myLikes = function(userId) {
  const queryStr = `                                //this shows only hooks which a user likes.
    SELECT hooks.*
    FROM hooks
    JOIN likes ON likes.user_id = hooks.user_id
    WHERE likes.user_id = $1
  `
  db.query(queryStr, [userId])
    .then(res => res.rows)
    .catch(() => null)
}
// exports.myLikes = myLikes;

const myPosts = function(userId) {
  const queryStr = `
    SELECT hooks.*                                    //shows hooks which a user posts.
    FROM hooks
    WHERE user_id = $1
  `
  db.query(queryStr, [userId])
    .then(res => res.rows)
    .catch(() => null)
};
// exports.myPosts = myPosts;

const search = function(whatAUserIsLookingFor) {
  const queryStr = `
    SELECT hooks.*                                      //search function. Check titles and descriptions.
    FROM hooks
    WHERE description iLIKE $1                          //case insensitive
    OR title iLIKE $1
  `
  db.query(queryStr, [whatAUserIsLookingFor])
    .then(res => res.rows)
};
// exports.search = search;

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
// exports.rateTheHook = rateTheHook;

const isAnExistingUser = function(username, email) {
  const queryStr = `
    SELECT id
    FROM users
    WHERE username = $1
    OR email = $2
  `
  return db.query(queryStr, [username, email])
    .then(() => true)
    .catch(() => false)
};
// exports.isAnExistingUser = isAnExistingUser;

const correctPassword = function(email, password) {
  const queryStr = `
    SELECT password
    FROM users
    WHERE email = $1
  `
return db.query(queryStr, [email])
  .then(res => res.rows[0])
  .then(res => bcrypt.compareSync(password, res))
  .catch(() => false)


};
// exports.correctPassword = correctPassword;

const correctEmail = function(email) {
  const queryStr = `
    SELECT *
    FROM users
    WHERE email = $1
  `
  return db.query(queryStr, [email])
    .then(res => res.rows[0])
    .catch(() => false)
};
// exports.correctEmail = correctEmail;
module.exports = { correctEmail, correctPassword }

const addUser = function(username, email, passwoord) {
  const queryStr = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  return db.query(queryStr, [username, email, passwoord])
    .then(res => res.rows)
    .catch(e => null)
};
// exports.addUser = addUser;
