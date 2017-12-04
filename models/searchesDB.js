/* here is my model for handling my searchDB functionality, vis a vis finding all past searches; finding particular searches by id; saving the searches in the db; and finally deleting past searches */

const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {

  findAll() {
    return db.many(`
    SELECT *
      FROM searches
    ORDER BY searches.id ASC
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
        FROM searches
        WHERE id = $1
    `, id);
  },

  save(search) {
    return db.none(`
      INSERT INTO searches (result)
      VALUES ($1)
      `, search);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM searches
        WHERE id = $1
    `, id);
  },
};
