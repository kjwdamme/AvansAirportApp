checkIn = require('../models/queryModel');
const mongoose = require('mongoose');
const env = require('../config/env');

exports.index = function(req, res) {
    mongoose.connect(env.env.mongoReadHost);
    db = mongoose.connection;

    db.once('open', function callback() {
        checkIn.get(function (err, checkins) {
            if(err) {
                res.json({
                    status: 'error',
                    message: err,
                });
            }
            res.json({
                status: 'succes',
                message: 'checkins retrieved',
                data: checkins
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.view = function(req, res) {
    mongoose.connect(env.env.mongoReadHost);
    db = mongoose.connection;

    db.once('open', function callback() {
        checkIn.findById(req.params.checkin_id, function (err, checkin) {
            if (err) {
             res.send(err);
            }
            res.json({
                status: 'succes',
                message: 'checkin retrieved',
                data: checkin
            })
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};
