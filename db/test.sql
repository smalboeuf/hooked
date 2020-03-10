    SELECT hooks.id, hooks.title, description, categories.name AS Category, users.username AS username, AVG(rating) AS rating
    FROM hooks
    FULL OUTER JOIN categories ON hooks.category_id = categories.id
    FULL OUTER JOIN users ON users.id = hooks.user_id
    FULL OUTER JOIN ratings ON ratings.hook_id = hooks.id
    FULL OUTER JOIN likes ON likes.hook_id = hooks.id
    -- WHERE hooks.id = 1
    GROUP BY hooks.id, hooks.title, description, hooks.content, categories.name, users.username


-- select *
-- from hooks
-- full outer join likes on hooks.id = likes.hook_id
