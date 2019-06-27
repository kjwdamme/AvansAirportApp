Booking = require('../models/commandModel');
var queue = require('../queue/send');
var mongoose = require('mongoose');

exports.new = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds040837.mlab.com:40837/writebooking', { useNewUrlParser: true });

    var db = mongoose.connection;

    db.once('open', function callback() {
        var booking = new Booking();

        booking.flightID = req.body.flightID;
        booking.passenger = req.body.passenger;
        booking.email = req.body.email;
        booking.costs = req.body.costs;

        // check if max flight baggage is reached
        // check if there are places left
        // check if max baggage pp is reached
        // retrieve costs from flight

        booking.save(function (err) {
            res.json({
                message: 'New booking created!',
                data: booking
            });    

            queue.send(booking);
            mongoose.connection.close();
            mongoose.disconnect();

        });
    });
};