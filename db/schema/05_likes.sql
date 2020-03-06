-- Drop and recreate Likes table (Example)

DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  hook_id INTEGER  REFERENCES users(id) ON DELETE CASCADE,
  like Boolean DEFAULT FALSE
);
