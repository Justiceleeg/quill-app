DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial primary key,
  name TEXT,
  email TEXT
);

insert into users (name, email) values ('test@test.com', 'test@test.com');
