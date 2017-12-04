/* below is my search router, which i will send to my server.js file allowing me to handle all past search functionality in my app */

const express = require('express');
const searchesController = require('../controllers/searchesController.js');
const views = require('../controllers/viewController.js');

const searchRouter = express.Router();

searchRouter.route('/:id')
  .get(searchesController.getOne, views.showOneSearch, views.show404)
  .delete(searchesController.destroy, views.handleSearchDelete, views.show404);

searchRouter.route('/')
  .get(searchesController.index, views.showSearches, views.show404)
  .post(searchesController.create, views.handleSearchCreate, views.show406);

module.exports = searchRouter;
