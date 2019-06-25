Invoice = require('../models/commandModel');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

exports.new = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds034797.mlab.com:34797/writeinvoice', { useNewUrlParser: true });

    var db = mongoose.connection;

    db.once('open', function callback() {
        var invoice = new Invoice();

        invoice.flightID = req.body.flightID;
        invoice.passenger = req.body.passenger;
        invoice.email = req.body.email;
        invoice.costs = req.body.costs;

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

exports.sendInvoice = function (receiver) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AvansFlights@gmail.com',
            pass: '$Avans000'
        }
    });

    var mailOptions = {
        from: 'AvansFlights@gmail.com',
        to: receiver,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};