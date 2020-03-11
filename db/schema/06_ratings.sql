-- Drop and recreate Ratings table (Example)

DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  hook_id INTEGER  REFERENCES hooks(id) ON DELETE CASCADE,
  rating SMALLINT CHECK (rating > 0 AND rating < 6)
);
