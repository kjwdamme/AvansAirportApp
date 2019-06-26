let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let bookingCommands = require("./routes/commandRoutes");
let bookingQueries = require("./routes/queryRoutes");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var db = mongoose.connection;

var port = process.env.PORT || 9090;

app.use('/command', bookingCommands)

app.use('/query', bookingQueries)

app.listen(port, function () {
    console.log("Running on port " + port);
});