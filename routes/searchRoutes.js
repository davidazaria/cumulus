const express = require('express');
const searchesController = require('../controllers/searchesController.js');
const views = require('../controllers/viewController.js');

const searchRouter = express.Router();

searchRouter.route('/:id')
  .get(searchesController.getOne, views.showOneSearch, views.show404)
  .delete(searchesController.destroy, views.handleDelete, views.show404);

searchRouter.route('/')
  .get(searchesController.index, views.showSearches, views.show404)
  .post(searchesController.create, views.handleCreate, views.show406);

module.exports = searchRouter;
