const express = require('express');
const routes = express.Router();
const jobControllers = require('../../controllers/job.controllers');
const authorization = require('../../middleware/authorization');
const verifyToken = require('../../middleware/verifyToken');


routes.route('/')
    .get(jobControllers.getJobs)
    .post(verifyToken, authorization('admin', 'hiring-manager'), jobControllers.addJobs);

routes.route('/:id')
    .get(verifyToken, jobControllers.getJobById)
    .patch(verifyToken, authorization('admin', 'hiring-manager'), jobControllers.updateJobById);

routes.route('/:id/apply').post(verifyToken, jobControllers.applyForJob);


module.exports = routes;