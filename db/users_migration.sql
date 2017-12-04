

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (255),
  password VARCHAR (255),
  fullname VARCHAR (255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON users (username);

