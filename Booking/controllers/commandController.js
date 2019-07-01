Booking = require('../models/commandModel');
var queue = require('../queue/send');
var mongoose = require('mongoose');
const axios = require('axios');


exports.new = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds040837.mlab.com:40837/writebooking', { useNewUrlParser: true });

    var db = mongoose.connection;

    db.once('open', function callback() {
        axios.get('http://flightmanagement:5001/api/flights/' + req.body.flightID)
            .then(response => {
                console.log(response.data);
                if (response.status == 200) {

                    var passengers = 0;
                    var baggage = 0;

                    Booking.find({ flightID: req.body.flightID }, function (err, booking) {
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
                    }).then(() => {
                        if (passengers + req.body.passenger.length <= response.data.planeModel.maxPassengers &&
                            baggage + getTotalBaggageWeight(req.body.passenger) <= response.data.planeModel.maxBaggageWeight) {

                            var booking = new Booking();

                            booking.flightID = req.body.flightID;
                            booking.passenger = req.body.passenger;
                            booking.email = req.body.email;
                            booking.costs = response.data.cost;

                            booking.save(function (err) {
                                res.json({
                                    message: 'New booking created!',
                                    data: booking
                                });

                                queue.send(booking);
                                mongoose.connection.close();
                                mongoose.disconnect();

                            });
                        } else {
                            res.json({
                                message: 'Not enough space.'
                            });
                        }
                    });

                } else {
                    res.json({
                        message: 'Flight does not exist.'
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    });
};

function getTotalBaggageWeight(passengers) {
    var totalBaggage = 0;

    passengers.forEach(p => {
        totalBaggage += p.baggageKG;
    });

    return totalBaggage;
}