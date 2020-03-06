-- Drop and recreate Hooks table (Example)

DROP TABLE IF EXISTS hooks CASCADE;

CREATE TABLE hooks (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  comment_id INTEGER,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  like_id INTEGER,
  rating INTEGER,
  category_id INTEGER
);
