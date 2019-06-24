Invoice = require('../models/commandModel');
var mongoose = require('mongoose');

exports.new = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds034797.mlab.com:34797/writeinvoice', { useNewUrlParser: true });

    var db = mongoose.connection;

    db.once('open', function callback() {
        var invoice = new Invoice();

        invoice.flightID = req.body.flightID;
        invoice.passenger = req.body.passenger;
        invoice.email = req.body.email;

        invoice.save(function (err) {
            res.json({
                message: 'New invoice created!',
                data: invoice
            });

            mongoose.connection.close();
            mongoose.disconnect();

        });
    });
};