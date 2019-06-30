var amqp = require('amqplib/callback_api');

module.exports = {
    send: function (booking) {
        amqp.connect('amqp://rabbitmq', function(error0, connection) {
            if (error0) {
              throw error0;
            }
            connection.createChannel(function(error1, channel) {
              if (error1) {
                throw error1;
              }
              var exchange = 'testbookings';
              var msg = JSON.stringify(booking);
          
              channel.assertExchange(exchange, 'fanout', {
                durable: false
              });
              channel.publish(exchange, '', Buffer.from(msg));
              console.log(" [x] Sent %s", msg);
            });
          
            setTimeout(function() { 
              connection.close(); 
            }, 500);
          });
    }
};