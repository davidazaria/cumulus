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
        console.log('hello');
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
