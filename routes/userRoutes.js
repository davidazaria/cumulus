const express = require('express');
const userController = require('../controllers/userController.js');
const views = require('../controllers/viewController.js');

const usersRouter = express.Router();

usersRouter.get('/new', views.showAddForm, views.show404);
usersRouter.get('/:id/edit', userController.getOne, views.showEditForm, views.show404);

usersRouter.route('/:id')
  .get(userController.getOne, views.showOne, views.show404)
  .put(userController.update, views.handleUpdate, views.show406)
  .delete(userController.destroy, views.handleDelete, views.show404);

usersRouter.route('/')
  .get(userController.index, views.showUsers, views.show404)
  .post(userController.create, views.handleCreate, views.show406);

module.exports = usersRouter;
