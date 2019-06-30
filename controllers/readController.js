BorderSecurityModel = require('../models/readModel');

var mongoose = require('mongoose');

exports.index = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds016138.mlab.com:16138/bordersecurity_read', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        BorderSecurityModel.get(function (err, events) {
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

exports.viewByID = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds016138.mlab.com:16138/bordersecurity_read', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        BorderSecurityModel.findById(req.params.id, function (err, events) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "BorderSecurityModel retrieved successfully",
                data: events
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.viewByFlightID = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds016138.mlab.com:16138/bordersecurity_read', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        BorderSecurityModel.find({ flightID: req.params.id }, function (err, events) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "BorderSecurityModel by flightID retrieved successfully",
                data: events
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};