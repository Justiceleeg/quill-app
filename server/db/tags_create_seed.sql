DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id serial primary key,
  type TEXT
);

INSERT INTO tags (type)
VALUES ("test")
