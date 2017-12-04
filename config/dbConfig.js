/* i will be passing this on to my dbmodel files for configuring up to my database */

module.exports = process.env.DATABASE_URL || {
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'cumulus',
};
