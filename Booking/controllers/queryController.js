Booking = require('../models/queryModel');
Passenger = require('../models/passengerModel');

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

exports.viewByID = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds046037.mlab.com:46037/readbooking', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Booking.findById(req.params.booking_id, function (err, booking) {
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

exports.viewByEmail = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds046037.mlab.com:46037/readbooking', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Booking.find({ email: req.params.email }, function (err, booking) {
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

exports.viewFlightStatus = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds046037.mlab.com:46037/readbooking', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Booking.find({ flightID: req.params.flightID }, function (err, booking) {
            if (err)
                res.send(err);

            var passengers = 0;
            var baggage = 0;
            booking.forEach(booking => {
                booking.passenger.forEach(passenger => {
                    if (passenger._doc.isValid == true) {
                        baggage = baggage + passenger._doc.baggageKG;
                        passengers = passengers + 1;
                    } else {
                        baggage = baggage - passenger._doc.baggageKG;
                        passengers = passengers - 1;
                    }
                });
            });

            res.json({
                status: "success",
                message: "Flight info retrieved successfully",
                passengers: passengers,
                baggageKG: baggage
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};