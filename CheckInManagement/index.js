let express = require('express')
let app = express();
let mongoose = require ('mongoose');
let apiRoutes = require ('./api/api-routes');
let bodyParser = require('body-parser');

module.exports = {};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: ' application/vnd.api+json'
}));

var port = process.env.PORT || 8080;

app.use('/api/checkin', apiRoutes)
app.use(function (err, req, res, next) {
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    };
    res.status(401).send(error);
})

app.use('*', function (req, res){
    res.status(400);
    res.json({
        'error': 'URL niet beschikbaar'
    });
});

app.listen(port, function () {
    console.log("Running on port " + port);
});