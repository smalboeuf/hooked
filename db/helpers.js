const db = require('./index');
const bcrypt = require('bcrypt');

const howManyPeopleLike = function(hookId) {
  const queryStr = `
  select hook_id, likes.favourite, count(favourite) as love
  from likes
  where hook_id = $1
  group by hook_id, likes.favourite
  `
  return db.query(queryStr, [hookId])
    .then(res => res.rows[0])
};
// exports.howManyPeopleLike = howManyPeopleLike;

const avgRatings = function(hookId) {
  const queryStr = `
    SELECT AVG(ratings) AS rating
    FROM ratings
    WHERE hook_id = $1
  `
  return db.query(queryStr, [hookId])
    .then(res => res.rows[0])

};
// exports.avgRatings = avgRatings;

const myLikes = function(userId) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    JOIN likes ON likes.user_id = hooks.user_id
    WHERE likes.user_id = $1
  `
  return db.query(queryStr, [userId])
    .then(res => res.rows)

}
// exports.myLikes = myLikes;

const myPosts = function(userId) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    WHERE user_id = $1
  `
    return db.query(queryStr, [userId])
    .then(res => res.rows)

};

const postComments = function(postId) {
  const queryStr = `
  SELECT *
  FROM comments
  WHERE hook_id = $1
  `;

  return db.query(queryStr, [postId])
  .then(res => res.rows);
}
// exports.myPosts = myPosts;

const search = function(whatAUserIsLookingFor) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    WHERE description iLIKE $1
    OR title iLIKE $1
  `
  return db.query(queryStr, [whatAUserIsLookingFor])
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

};
// exports.isAnExistingUser = isAnExistingUser;

const correctPassword = function(email, password) {
  const queryStr = `
    SELECT password
    FROM users
    WHERE email = $1
  `
  return db.query(queryStr, [email])
    .then(res => {
      if (res.rows.length !== 0) {
        return bcrypt.compareSync(password, res.rows[0].password)
      } else {
        return false
      }
    })
};

const correctEmail = function(email) {
  const queryStr = `
    SELECT id
    FROM users
    WHERE email = $1
  `
  return db.query(queryStr, [email])
    .then (res => res.rows[0])

};
// exports.correctEmailAndPassword = correctEmailAndPassword;

const addUser = function(username, email, passwoord) {
  const queryStr = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  return db.query(queryStr, [username, email, passwoord])
    .then(res => res.rows)

};
// exports.addUser = addUser;

const profileEditor = function(userId, username, email, password) {

  let queryStr = `
    UPDATE users
    SET
  `
  const values = [userId];

  if (username !== '') {
    values.push(username);
    queryStr += `username = $${values.length}`;
  }

  if (username !== '' && email !== '') {
    values.push(email);
    queryStr += `,
    email = $${values.length}`;
  } else if (username === '' && email !== '') {
    values.push(email);
    queryStr += `
    email = $${values.length}`;
  }

  const hashedPwd = bcrypt.hashSync(password, 10);

  if (username !== '' || email !== '') {
    if (password !== '') {
      values.push(hashedPwd);
      queryStr += `,
      password = $${values.length}`;
    }
  } else if (username === '' && email === '' && password !== '') {
    values.push(hashedPwd);
    queryStr += `password = $${values.length}`;
  }
  queryStr += `
  WHERE id = $1
  `;

  return db.query(queryStr, values)
    .then(res => res.rows[0])
};

const findUsernameBasedOnId = function (userId) {
  const queryStr = `
  SELECT username
  FROM users
  WHERE id = $1
  `;

  return db.query(queryStr, [userId])
  .then(res => res.rows[0]);
};

module.exports = {

  addUser,
  howManyPeopleLike,
  avgRatings,
  myLikes,
  myPosts,
  isAnExistingUser,
  search,
  rateTheHook,
  correctEmail,
  correctPassword,
  profileEditor,
  postComments,
  findUsernameBasedOnId,

}
