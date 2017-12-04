DROP TABLE IF EXISTS searches;

CREATE TABLE searches (
  id SERIAL PRIMARY KEY,
  result TEXT ARRAY,
  user_id INTEGER REFERENCES users,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON searches (result);
