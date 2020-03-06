-- Drop and recreate Comments table (Example)

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  comment TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  hook_id INTEGER REFERENCES hooks(id) ON DELETE CASCADE
);
