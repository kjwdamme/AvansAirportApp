var amqp = require('amqplib/callback_api');
WriteModel = require('../models/writeModel');
var mongoose = require('mongoose');
ReadModel = require("../models/readModel");

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

                channel.assertQueue('bordersecuritybookingqueue', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    channel.bindQueue('bordersecuritybookingqueue', exchange, '');

                    channel.consume('bordersecuritybookingqueue', function (msg) {
                        if (msg.content) {
                            mongoose.connect('mongodb://User:User123@ds026658.mlab.com:26658/bordersecurity_write', { useNewUrlParser: true });

                            var db = mongoose.connection;

                            var booking = JSON.parse(msg.content.toString());

                            db.once('open', function callback() {


                                booking.passenger.forEach(element => {
                                    ReadModel.find({ firstName: element.firstName, lastName: element.lastName }, function (err, events) {
                                        // console.dir(events);
                                        try {
                                            var x = events[0].firstName
                                            console.dir(events[0].firstName);
                                        } catch (err) {
                                            console.log("Catch Test");
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

                                                setTimeout(function () {
                                                    console.log("processed all items");
                                                    mongoose.connection.close();
                                                    mongoose.disconnect();
                                                    console.log("Disconnection succesfull");
                                                }, 200 * booking.passenger.Length);
                                            });
                                        }
                                    });



                                });


                            });
                        }
                    }, {
                            noAck: true
                        });
                });
            });
        });
    }
}
