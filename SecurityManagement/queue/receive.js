// var amqp = require('amqplib/callback_api');
// WriteModel = require('../models/writeModel');
// var mongoose = require('mongoose');

//     module.exports = {
//         receive: function () {
//             amqp.connect('amqp://localhost', function (error0, connection) {
//                 if (error0) {
//                     throw error0;
//                 }
//                 connection.createChannel(function (error1, channel) {
//                     if (error1) {
//                         throw error1;
//                     }
            
//                     var queue = 'bookings';
            
//                     channel.assertQueue(queue, {
//                         durable: false
//                     });
            
//                     console.log(" [*] Waiting for messages in %s.", queue);
            
//                     channel.consume(queue, function (msg) {
//                         console.log(" [x] Received message...");
//                         var booking = JSON.parse(msg.content.toString());
//                         delete booking._id;
                        
//                         mongoose.connect('mongodb://User:User123@ds038319.mlab.com:38319/security_write', { useNewUrlParser: true });

//                         var db = mongoose.connection;
                    
//                         db.once('open', function callback() {
//                             var writeModel = new WriteModel();
                    
//                             writeModel.message = booking.email;
                    
//                             writeModel.save(function (err) {
//                                console.log("Gelukt");                     
//                                 mongoose.connection.close();
//                                 mongoose.disconnect();
                    
//                             });
//                         });

//                     }, {
//                             noAck: true
//                         });
//                 });
//             });
//           }
//           };
