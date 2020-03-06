-- Drop and recreate Likes table (Example)

DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  hook_id INTEGER REFERENCES hooks(id)
);
