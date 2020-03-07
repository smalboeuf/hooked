-- Drop, recreate, and fill all of tables

\i db/schema/01_users.sql;
\i db/schema/04_categories.sql;
\i db/schema/02_hooks.sql;
\i db/schema/03_comments.sql;
\i db/schema/05_likes.sql;
\i db/schema/06_ratings.sql;

\i db/seeds/01_users.sql;
\i db/seeds/04_categories.sql;
\i db/seeds/02_hooks.sql;
\i db/seeds/03_comments.sql;
\i db/seeds/05_likes.sql;
\i db/seeds/06_ratings.sql;
