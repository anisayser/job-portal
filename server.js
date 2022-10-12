const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = require('./app');
require('colors');

const PORT = process.env.PORT || 5000;


//Database Connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Database Connected Sucessfully.".random.bold);
})


app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`.brightCyan.bold);
})