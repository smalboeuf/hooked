-- Drop and recreate Hooks table (Example)

DROP TABLE IF EXISTS hooks CASCADE;

CREATE TABLE hooks (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  content TEXT
)
