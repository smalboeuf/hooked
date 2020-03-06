-- Drop and recreate Hooks table (Example)

DROP TABLE IF EXISTS hooks CASCADE;

CREATE TABLE hooks (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  like_id INTEGER REFERENCES likes(id) ON DELETE CASCADE,
  rating INTEGER,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
