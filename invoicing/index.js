let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let invoiceQueries = require("./routes/invoiceQueries")

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/invoice', { useNewUrlParser: true });

var db = mongoose.connection;

var port = process.env.PORT || 8080;

app.use('/', invoiceQueries)

app.listen(port, function () {
    console.log("Running on port " + port);
});