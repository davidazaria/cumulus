/* here is my searchController, which i will send on to my routes for appropriate handling based on the specified methods */

const searchDB = require('../models/searchesDB');

module.exports = {

  index(req, res, next) {
    searchDB.findAll()
      .then((searches) => {
        res.locals.searches = searches;
        next();
      })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    searchDB.findById(req.params.id)
      .then((search) => {
        res.locals.search = search;
        next();
      })
      .catch(err => next(err));
  },

  create(req, res, next) {
    console.log(req.body, 'body');
    searchDB.save(req.body)
      .then((search) => {
        res.locals.search = search;
        next();
      })
      .catch(err => next(err));
  },

  destroy(req, res, next) {
    searchDB.destroy(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },
};
