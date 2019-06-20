Invoice = require('../models/commandModel');

exports.new = function (req, res) {
    var invoice = new Invoice();

    invoice.FlightID = req.body.FlightID;
    invoice.Passenger = req.body.Passenger;
    invoice.Email = req.body.Email;

    invoice.save(function (err) {
        res.json({
            message: 'New invoice created!',
            data: invoice
        });
    });
};