var amqp = require('amqplib/callback_api');
borderSecurity = require('../models/writeModel');
var commandController = require('../controllers/writeController');
var mongoose = require('mongoose');

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

                channel.assertQueue('bookingqueue4', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    channel.bindQueue('bookingqueue4', exchange, '');

                    channel.consume('bookingqueue4', function (msg) {
                        if (msg.content) {
                            mongoose.connect('mongodb://User:User123@ds026658.mlab.com:26658/bordersecurity_write', { useNewUrlParser: true });

                            var db = mongoose.connection;

                            var booking = JSON.parse(msg.content.toString());

                            db.once('open', function callback() {
                                var bordersecurity = new borderSecurity()

                                // foreach passenger...
                                // check if firstname + lastname already exists 
                                console.log(booking);
                                bordersecurity.firstName = booking.passenger[0].firstName;
                                bordersecurity.lastName = booking.passenger[0].lastName;
                                bordersecurity.age = booking.passenger[0].age;
                                bordersecurity.gender = booking.passenger[0].gender;
                                bordersecurity.flightID = booking.flightID;

                                console.log(bordersecurity);

                                bordersecurity.save(function (err) {
                                    if(err) return console.error(err);

                                    // commandController.sendInvoice(invoice);

                                    mongoose.connection.close();
                                    mongoose.disconnect();

                                    var secs = msg.content.toString().split('.').length - 1;

                                    setTimeout(function () {
                                        console.log(" [x] Done");
                                        channel.ack(msg);
                                    }, secs * 1000);

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