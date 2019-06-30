SecurityEvent = require('../models/readModel');

var mongoose = require('mongoose');

exports.index = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds042459.mlab.com:42459/security_read', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        SecurityEvent.get(function (err, events) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Read Succes",
                data: events
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};