const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


//middlewares
app.use(express.json());
app.use(cors());


//ALL ROUTES
const userRoutes = require('./routes/userRoutes/user.route');
const jobRoutes = require('./routes/jobRoutes/job.route');
const managerRoutes = require('./routes/managerRoutes/manager.route');


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/manager', managerRoutes);




app.get('/', (req, res) => {
    res.send('Job Portal Server is Running.');
});


module.exports = app;