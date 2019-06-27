var amqp = require('amqplib/callback_api');
WriteModel = require('../models/writeModel');
var mongoose = require('mongoose');

module.exports = {
    receive: function () {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                var queue = 'bookings';

                channel.assertQueue(queue, {
                    durable: false
                });

                console.log(" [*] Waiting for messages in %s.", queue);

                channel.consume(queue, function (msg) {
                    console.log(" [x] Received message...");
                    var booking = JSON.parse(msg.content.toString());
                    delete booking._id;

                    mongoose.connect('mongodb://User:User123@ds026658.mlab.com:26658/bordersecurity_write', { useNewUrlParser: true });

                    var db = mongoose.connection;

                    db.once('open', function callback() {
                        var itemsProcessed = 0;

                        booking.passenger.forEach(element => {
                            var writeModel = new WriteModel();
                            writeModel.firstName = element.firstName;
                            writeModel.flightID = booking.flightID;
                            writeModel.lastName = element.lastName;
                            writeModel.age = element.age;
                            writeModel.gender = element.gender;
                            writeModel.save(function (err) {
                                if (err) console.log(err);
                                console.log("Firstname gelukt");
                                console.dir(element);
                                itemsProcessed++;
                            });
                            if (itemsProcessed == booking.passenger.Length) {
                                console.log("processed all items");
                                mongoose.connection.close();
                                mongoose.disconnect();
                            }
                        });
                    });

                }, {
                        noAck: true
                    });
            });
        });
    }
};
