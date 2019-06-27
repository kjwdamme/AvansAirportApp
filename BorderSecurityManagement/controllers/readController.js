BorderSecurityEvent = require('../models/readModel');

var mongoose = require('mongoose');

exports.index = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds016138.mlab.com:16138/bordersecurity_read', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        BorderSecurityEvent.get(function (err, events) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Heil fucking hitler",
                data: events
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};