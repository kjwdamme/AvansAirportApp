var amqp = require('amqplib/callback_api');

module.exports = {
    send: function (booking) {
        amqp.connect('amqp://rabbitmq:5672', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                var queue = 'bookings2';
                var msg = JSON.stringify(booking);

                channel.assertQueue(queue, {
                    durable: true
                });
                channel.sendToQueue(queue, Buffer.from(msg), {
                    persistent: true
                });
                console.log(" [x] Sent '%s'", msg);
            });
            setTimeout(function () {
                connection.close();
            }, 500);
        });
    }
};