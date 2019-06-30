let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let writeRoutes = require("./routes/writeRoutes");
let readRoutes = require("./routes/readRoutes");
var queue = require('./queue/receive');

var port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/read', readRoutes);

app.use('/write', writeRoutes);

app.listen(port, function () {
    console.log("Running on port " + port);
    // queue.receive();
});