const express = require('express');
const routes = express.Router();
const userController = require('../../controllers/user.controllers');
const verifyToken = require('../../middleware/verifyToken');
const authorization = require('../../middleware/authorization');

routes.route('/signup').post(userController.signup);
routes.route('/login').post(userController.login);
routes.route('/me').get(verifyToken, userController.getMe);
routes.route('/hiring-manager').get(verifyToken, authorization('admin'), userController.getHiringManagers)

routes.route('/').get(verifyToken, authorization('admin'), userController.getUsers);
routes.route('/:id').get(verifyToken, authorization('admin'), userController.getUserById).patch(verifyToken, authorization('admin'), userController.updateUserById);



module.exports = routes;