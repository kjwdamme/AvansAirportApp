let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let atcCommands = require("./routes/commandRoutes");
let atcQueries = require("./routes/queryRoutes");
ATC = require("./models/commandModel");
var queue = require('./queue/receive');
var cloneJob = require('./queue/clone');
let env = require('./config/env');


module.exports = {};


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: ' application/vnd.api+json'
}));

app.set('port', env.env.port);
app.set('env', 'development');

app.use('/command', atcCommands)
app.use('/query', atcQueries)

app.use('*', function (req, res){
    res.status(400);
    res.json({
        'error': 'URL niet beschikbaar'
    });
});

app.listen(env.env.port, function () {
    console.log("Running on port " + env.env.port);
    //cloneJob.scheduleCloneJob();
     queue.receive();
});
