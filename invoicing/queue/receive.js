var amqp = require('amqplib/callback_api');
Invoice = require('../models/commandModel');
var commandController = require('../controllers/commandController');
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

                channel.assertQueue('bookingqueue', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    channel.bindQueue('bookingqueue', exchange, '');

                    channel.consume('bookingqueue', function (msg) {
                        if (msg.content) {
                            mongoose.connect('mongodb://admin:Admin0@ds034797.mlab.com:34797/writeinvoice', { useNewUrlParser: true });

                            var db = mongoose.connection;

                            var booking = JSON.parse(msg.content.toString());

                            db.once('open', function callback() {
                                var invoice = new Invoice()

                                invoice._id = booking._id;
                                invoice.flightID = booking.flightID;
                                invoice.passenger = booking.passenger;
                                invoice.email = booking.email;
                                invoice.costs = booking.costs;

                                console.log(invoice);

                                invoice.save(function (err) {
                                    if (err) return console.error(err);

                                    commandController.sendInvoice(invoice);

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