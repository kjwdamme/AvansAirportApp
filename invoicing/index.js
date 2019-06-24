let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let invoiceCommands = require("./routes/commandRoutes");
let invoiceQueries = require("./routes/queryRoutes");
Invoice = require('./models/commandModel');
var queue = require('./queue/receive');
var cloneJob = require('./queue/clone');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use('/command', invoiceCommands)

app.use('/query', invoiceQueries)

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