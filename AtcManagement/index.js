let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let atcCommands = require("./routes/commandRoutes");
let atcQueries = require("./routes/queryRoutes");
ATC = require("./models/commandModel");
var queue = require('./queue/receive');
var cloneJob = require('./queue/clone');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/atc', { useNewUrlParser: true });

// var db = mongoose.connection;

var port = process.env.PORT || 8080;

app.use('/command', atcCommands)

app.use('/query', atcQueries)

app.listen(port, function () {
    console.log("Running on port " + port);
    cloneJob.scheduleCloneJob();
    queue.receive();
});



// Automatically clone read/write DB (every hour)
// Via mongoose or else native Mongo
// Via raw admin command?

// Right schema's

// More routes

// Working reads

// Treat objects like events

// Apply to bookings API