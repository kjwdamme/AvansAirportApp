let express = require('express')
let app = express();
let env = require('./config/env');
let mongoose = require ('mongoose');
let bodyParser = require('body-parser');
let checkInCommands = require('./api/commandRoutes')
let checkInQuery = require('./api/queryRoutes');

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

app.use('/command', checkInCommands)
app.use('/query', checkInQuery)

app.use('*', function (req, res){
    res.status(400);
    res.json({
        'error': 'URL niet beschikbaar'
    });
});

app.listen(env.env.port, function () {
    console.log("Running on port " + env.env.port);
});