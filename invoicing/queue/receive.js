var amqp = require('amqplib/callback_api');
Invoice = require('../models/commandModel');

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
            
                        var invoice = new Invoice()
            
                        invoice.flightID = booking.flightID;
                        invoice.passenger = booking.passenger;
                        invoice.email = booking.email;
            
                        console.log(invoice);
            
                        invoice.save(function (err, invoice) {
                            if (err) return console.error(err);
                            console.log("Saved to collection.");
                          });
            
                    }, {
                            noAck: true
                        });
                });
            });
          }
          };
