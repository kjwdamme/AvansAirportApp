Invoice = require('../models/queryModel');

var mongoose = require('mongoose');

exports.index = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds060749.mlab.com:60749/readinvoice', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.get(function (err, invoices) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Invoices retrieved successfully",
                data: invoices
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.view = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds060749.mlab.com:60749/readinvoice', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.findById(req.params.invoice_id, function (err, invoice) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Invoice retrieved successfully",
                data: invoice
            });
            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};