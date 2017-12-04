/* here is my model for handling my userDB functionality, vis a vis finding all users; finding particular users by id; saving the user entries in the db; and finally deleting users */

const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
        FROM users
      ORDER BY users.username ASC
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
        FROM users
        WHERE id = $1
    `, id);
  },

  save(user) {
    return db.one(`
      INSERT INTO users (username, password, fullname)
      VALUES ($/username/, $/password/, $/fullname/)
      RETURNING *
      `, user);
  },

  update(user) {
    return db.one(`
      UPDATE users
      SET
      username = $/username/,
      password = $/password/,
      fullname = $/fullname/
      WHERE id = $/id/
      RETURNING *
      `, user);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM users
       WHERE id = $1
    `, id);
  },
};
