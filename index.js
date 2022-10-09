/**
 * starting point for the application
 */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Restaurant = require('./models/restaurant.model');

// register middleware to read json body
app.use(express.json());

// need to connect to mongodb
mongoose.connect("mongodb://localhost/restaurants");

//connnection object created
const db = mongoose.connection;
//check if error connecting to database
db.on('error',()=>{
    console.log("error connecting to database");
})

// need to export the routes created

require('./routes/restaurant.routes')(app);

/**
 * start the server
 */

app.listen(8080,()=>{
    console.log("Server started at port 8080");
})