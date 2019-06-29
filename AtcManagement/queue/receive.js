// var amqp = require('amqplib/callback_api');
// ATC = require('../models/commandModel');

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
            
//                     var queue = 'atcs';
            
//                     channel.assertQueue(queue, {
//                         durable: false
//                     });
            
//                     console.log(" [*] Waiting for messages in %s.", queue);
            
//                     channel.consume(queue, function (msg) {
//                         console.log(" [x] Received message...");
//                         var airTC = JSON.parse(msg.content.toString());
//                         delete airTC._id;
            
//                         var atc = new ATC()
            
//                         atc.flight = airTC.flight;
//                         atc.landingstrip = airTC.landingstrip;
//                         atc.permission = airTC.permission;
            
//                         console.log(atc);
            
//                         atc.save(function (err, atc) {
//                             if (err) return console.error(err);
//                             console.log("Saved to collection.");
//                           });
            
//                     }, {
//                             noAck: true
//                         });
//                 });
//             });
//           }
//           };