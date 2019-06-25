var amqp = require('amqplib/callback_api');
Invoice = require('../models/commandModel');
var commandController = require('../controllers/commandController');
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
            
                    var queue = 'bookings2';
            
                    channel.assertQueue(queue, {
                        durable: true 
                    });

                    channel.prefetch(1);
            
                    console.log(" [*] Waiting for messages in %s.", queue);
            
                    channel.consume(queue, function (msg) {
                        console.log(" [x] Received message...");

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

                                setTimeout(function() {
                                    console.log(" [x] Done");
                                    channel.ack(msg);
                                  }, secs * 1000);
                    
                            });
                        });     
                    }, {
                            noAck: false
                        });
                });
            });
          }
          };
