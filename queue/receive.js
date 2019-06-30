var amqp = require('amqplib/callback_api');
ATC = require('../models/commandModel');
var commandController = require('../controllers/commandController');
var mongoose = require('mongoose');
const env = require('../config/env');

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
                var exchange = 'testflightmanagement';

                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });

                channel.assertQueue('flightqueue1', {
                    exclusive: false
                }, function (error2, q) {
                    if (error2) {
                        throw error2;
                    }
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    channel.bindQueue('flightqueue1', exchange, '');

                    channel.consume('flightqueue1', function (msg) {
                        if (msg.content) {
                            // mongoose.connect('mongodb://admin:Admin0@ds034797.mlab.com:34797/writeinvoice', { useNewUrlParser: true });
                            mongoose.connect(env.env.mongoWritehost, { useNewUrlParser: true})

                            var db = mongoose.connection;

                            var flight = JSON.parse(msg.content.toString());

                            db.once('open', function callback() {
                                var atc = new ATC()

                                atc.flight = flight.flight;
                                atc.landingstrip = atc.landingstrip;
                                atc.permission = atc.permission;

                                console.log(atc);

                                atc.save(function (err) {
                                    if (err) return console.error(err);

                                    commandController.sendAtc(atc);

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