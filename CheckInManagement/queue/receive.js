var amqp = require('amqplib/callback_api');
checkIn = require('../models/commandModel');
var commandController = require('../controllers/commandController');
var mongoose = require('mongoose');
const axios = require('axios');

module.exports = {
    receive: function () {
        amqp.connect('amqp://rabbitmq', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                var exchange = 'testbookings';

                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });

                channel.assertQueue('bookingqueue3', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    channel.bindQueue('bookingqueue3', exchange, '');

                    channel.consume('bookingqueue3', function (msg) {
                        if (msg.content) {
                            mongoose.connect('mongodb://admin:admin123@ds343217.mlab.com:43217/writecheckin', { useNewUrlParser: true });

                            var db = mongoose.connection;

                            var booking = JSON.parse(msg.content.toString());

                            db.once('open', function callback() {
                                flightId = booking.flightID
                                console.log("this is the flight id: " + flightId)
                                axios.get('http://flightmanagement:5001/api/flights/' + booking.flightID)
                                    .then(response => {
                                        var checkin = new checkIn()
                                        console.dir("response flight:" + response.data);
                                        checkin._id = booking._id;
                                        checkin.passenger = booking.passenger;
                                        checkin.email = booking.email;
                                        checkin.flight = [{
                                            PlaneName: response.data.planeModel.name,
                                            PlaneId: response.data.planeModel.id,
                                            AirlineId: response.data.airlineModel.id,
                                            DepartureDate: response.data.departureDate,
                                            Delay: response.data.delayMinutes,
                                            Destination: response.data.destination
                                        }],

                                            console.log("this is the result: " + checkin);

                                        checkin.save(function (err) {
                                            if (err) return console.error(err);

                                            commandController.sendCheckInNotice(checkin);

                                            mongoose.connection.close();
                                            mongoose.disconnect();

                                            var secs = msg.content.toString().split('.').length - 1;

                                            setTimeout(function () {
                                                console.log(" [x] Done");
                                                channel.ack(msg);
                                            }, secs * 1000);

                                        });

                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            });
                        }
                    }, {
                            noAck: false
                        });
                });
            });
        });
    }
}