const CheckIn = require('../models/commandModel');
const env = require('../config/env');
const mongoose = require('mongoose');

exports.new = function (req, res) {
    mongoose.connect(env.env.mongoWritehost, { useNewUrlParser: true})
    var db = mongoose.connection;

    db.once('open', function callback() {
        var checkin = new CheckIn();

        checkin.passenger = req.body.passenger;
        checkin.flight = req.body.flight;
        checkin.checkedIn = req.body.checkedIn;
        checkin.checkedInDate = req.body.checkedInDate;

        checkin.save(function (err) {
            res.json({
                message: 'Check in created',
                data: checkin
            });

            mongoose.connection.close();
            mongoose.disconnect();
        })
    })
};
