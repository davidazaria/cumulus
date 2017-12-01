const userDB = require('../models/usersDB');

module.exports = {

  index(req, res, next) {
    userDB.findAll()
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    userDB.findById(req.params.id)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  },

  create(req, res, next) {
    console.log(req.body, 'body');
    userDB.save(req.body)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  },

  update(req, res, next) {
    console.log(req.body, 'update controller');
    userDB.update(req.body)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  },

  destroy(req, res, next) {
    userDB.destroy(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },
};
