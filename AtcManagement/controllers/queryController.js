ATC = require('../models/queryModel');
var mongoose = require('mongoose');
const env = require('../config/env');

exports.index = function (req, res) {
    // mongoose.connect('mongodb://Admin:Password123@ds343217.mlab.com:43217/readatc', { useNewUrlParser: true });
    mongoose.connect(env.env.mongoReadHost, { useNewUrlParser: true });
    db = mongoose.connection;

    db.once('open', function callback() {
        ATC.get(function (err, atcs) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "ATC retrieved successfully",
                data: atcs
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.viewById = function (req, res) {
    // mongoose.connect('mongodb://Admin:Password123@ds343217.mlab.com:43217/readatc', { useNewUrlParser: true });
    mongoose.connect(env.env.mongoReadHost);
    db = mongoose.connection;

    db.once('open', function callback() {
        ATC.findById(req.params.atc_id, function (err, atc) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "ATC retrieved successfully",
                data: atc
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};