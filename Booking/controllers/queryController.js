Booking = require('../models/queryModel');

var mongoose = require('mongoose');

exports.index = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds046037.mlab.com:46037/readbooking', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Booking.get(function (err, bookings) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Booking retrieved successfully",
                data: bookings
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.view = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds046037.mlab.com:46037/readbooking', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.findById(req.params.invoice_id, function (err, invoice) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Booking retrieved successfully",
                data: booking
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};