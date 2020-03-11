const db = require('./index');
const bcrypt = require('bcrypt');

const howManyPeopleLike = function (hookId) {
  const queryStr = `
  select hook_id, likes.favourite, count(favourite) as love
  from likes
  where hook_id = $1
  group by hook_id, likes.favourite
  `
  return db.query(queryStr, [hookId])
    .then(res => {
      if (!res.rows[0]) {
        return {hook_id: hookId, love: 0}
      } else {
        return res.rows[0]}
      })
};
// exports.howManyPeopleLike = howManyPeopleLike;

const usersLikesThisHook = function (hookId) {
  const queryStr = `
  select hook_id, user_id
  from likes
  where hook_id = $1
  `
  return db.query(queryStr, [hookId])
    .then(res => {
      if (!res.rows[0]) {
        return {hook_id: hookId, love: 0}
      } else {
        return res.rows[0]}
      })
}

const avgRatings = function (hookId) {
  const queryStr = `
    SELECT AVG(ratings) AS rating
    FROM ratings
    WHERE hook_id = $1
  `
  return db.query(queryStr, [hookId])
    .then(res => res.rows[0])

};
// exports.avgRatings = avgRatings;

const myLikes = function (userId) {
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

const myPosts = function (userId) {
  const queryStr = `
    SELECT hooks.*
    FROM hooks
    WHERE user_id = $1
  `
  return db.query(queryStr, [userId])
    .then(res => res.rows)

};

const newPost = function (title, description, userId, categoryId, content) {
  const queryStr = `
  INSERT INTO hooks (title, description, user_id, category_id, content)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `
  return db.query(queryStr, [title, description, userId, categoryId, content])
    .then(res => res.rows)
}

const deletePost = function (postId) {
  const queryStr = `
  DELETE FROM hooks
  WHERE id = $1;
  `;

  return db.query(queryStr, [postId]).then(res => res.rows);
}

const postComments = function (postId) {
  const queryStr = `
  SELECT *
  FROM comments
  JOIN users ON user_id = users.id
  WHERE hook_id = $1
  `;

  return db.query(queryStr, [postId])
    .then(res => res.rows);
}
// exports.myPosts = myPosts;

const getPostInfo = function (postId) {
  const queryStr = `
  SELECT *
  FROM hooks
  WHERE id = $1
  `;
  return db.query(queryStr, [postId])
  .then(res => res.rows[0]);
}


const search = function (whatAUserIsLookingFor) {
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

const rateTheHook = function (hookId, rating) {

  const queryStr = `
    INSERT INTO ratings (hook_id, rating)
    VALUES ($1, $2)
    RETURNING *;
  `
  return db.query(queryStr, [hookId, rating])
    .then(res => res.rows)

};
// exports.rateTheHook = rateTheHook;


const isAnExistingUser = function (username, email) {
  const queryStr = `
    SELECT id
    FROM users
    WHERE username = $1
    OR email = $2
  `
  return db.query(queryStr, [username, email])
    .then(res => {
      if (res.rows.length !== 0) {
        return true;
      } else {
        return false;
      }
    })

};
// exports.isAnExistingUser = isAnExistingUser;

const correctPassword = function (email, password) {
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

const correctEmail = function (email) {
  const queryStr = `
    SELECT id
    FROM users
    WHERE email = $1
  `
  return db.query(queryStr, [email])
    .then(res => res.rows[0])

};
// exports.correctEmailAndPassword = correctEmailAndPassword;

const addUser = function (username, email, passwoord) {
  const queryStr = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  return db.query(queryStr, [username, email, passwoord])
    .then(res => res.rows)
};
// exports.addUser = addUser;

const profileEditor = function (userId, username, email, password) {

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

const getCategories = function () {
  const queryString = `
    SELECT *
    FROM categories
  `
  return db.query(queryString)
    .then(res => res.rows)
}

const incrementLikes = function (userId, hookId) {
  const queryStr = `
      INSERT INTO likes (user_id, hook_id, favourite)
      VALUES ($1, $2, true)
    `;
  console.log("userid: ", userId, hookId)
  return db.query(queryStr, [userId, hookId]);
}

const decreaseLikes = function (userId, hookId) {
  const queryStr = `
      DELETE FROM likes
      WHERE user_id = $1 AND hook_id = $2;
    `;

  return db.query(queryStr, [userId, hookId]);
}

const allHooks = function () {
  const queryStr = `
    SELECT hooks.id, hooks.title, description, content, categories.name AS Category, users.username AS username, AVG(rating) AS rating
    FROM hooks
    left JOIN categories ON hooks.category_id = categories.id
    left JOIN users ON users.id = hooks.user_id
    left JOIN ratings ON ratings.hook_id = hooks.id
    GROUP BY hooks.id, hooks.title, description, hooks.content, categories.name, users.username
    ORDER BY id DESC;
    `
  return db.query(queryStr)
    .then(res => res.rows)
}

const myHooks = function(id) {
  const queryStr = `
    SELECT hooks.id, hooks.title, description, content, categories.name AS Category, users.username AS username, AVG(rating) AS rating
    FROM hooks
    left JOIN categories ON hooks.category_id = categories.id
    left JOIN users ON users.id = hooks.user_id
    left JOIN ratings ON ratings.hook_id = hooks.id
    WHERE hooks.user_id = $1
    GROUP BY hooks.id, hooks.title, description, hooks.content, categories.name, users.username
    `
    return db.query(queryStr, [id])
    .then(res => res.rows)
}

const getUserInfo = function (userId) {
  const queryStr = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  return db.query(queryStr, [userId]).then(res => res.rows[0]);
}

const addComment = function (commentContent, userId, hookId) {
  const queryStr = `
    INSERT INTO comments (comment, user_id, hook_id)
    VALUES ($1, $2, $3)
    `;

  return db.query(queryStr, [commentContent, userId, hookId]);
}




module.exports = {
  addUser,
  howManyPeopleLike,
  avgRatings, myLikes,
  newPost, myPosts, allHooks,
  isAnExistingUser,
<<<<<<< HEAD
  search, rateTheHook, myHooks, usersLikesThisHook,
  correctEmail, correctPassword, postComments, findUsernameBasedOnId, incrementLikes, decreaseLikes, addComment, getCategories, profileEditor, getUserInfo }
=======
  search, rateTheHook, myHooks,
  correctEmail, correctPassword, postComments, findUsernameBasedOnId, incrementLikes, decreaseLikes, addComment, getCategories, profileEditor, getUserInfo, getPostInfo, deletePost }
>>>>>>> master
