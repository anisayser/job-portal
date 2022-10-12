const express = require('express');
const routes = express.Router();
const managerControllers = require('../../controllers/manager.controller');
const verifyToken = require('../../middleware/verifyToken');
const authorization = require('../../middleware/authorization');


routes.route('/jobs').get(verifyToken, authorization('hiring-manager'), managerControllers.managerJobs);
routes.route('/jobs/:id').get(verifyToken, authorization('hiring-manager'), managerControllers.getManagerJobById);




module.exports = routes;