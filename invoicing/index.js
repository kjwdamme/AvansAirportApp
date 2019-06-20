let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let invoiceCommands = require("./routes/commandRoutes");
let invoiceQueries = require("./routes/queryRoutes");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/invoice', { useNewUrlParser: true });

var db = mongoose.connection;

var port = process.env.PORT || 8080;

app.use('/command', invoiceCommands)

app.use('/query', invoiceQueries)

app.listen(port, function () {
    console.log("Running on port " + port);
});