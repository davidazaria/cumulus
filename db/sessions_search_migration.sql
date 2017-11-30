\c cumulus;
DROP TABLE IF EXISTS sessions;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON sessions (id);

DROP TABLE IF EXISTS searches;

CREATE TABLE searches (
  id SERIAL PRIMARY KEY,
  result TEXT ARRAY,
  user_id INTEGER REFERENCES users,
  session_id INTEGER REFERENCES sessions,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON searches (result);
