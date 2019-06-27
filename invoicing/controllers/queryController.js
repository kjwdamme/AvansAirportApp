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

exports.viewByID = function (req, res) {
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

exports.viewByEmail = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds060749.mlab.com:60749/readinvoice', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.find({ email: req.params.email }, function (err, invoice) {
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

exports.getOpenCosts = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds060749.mlab.com:60749/readinvoice', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.find({ email: req.params.email }, function (err, invoice) {
            var costs = 0;
            invoice.forEach(element => {
                costs = costs + element.costs;
            });

            var type = "costs"

            if (costs < 0) {
                costs = costs * -1;
                type = "credit"
            }

            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Total " + type + " retrieved successfully.",
                data: costs,
                type: type
            });

            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.getTotalCosts = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds060749.mlab.com:60749/readinvoice', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.find({ email: req.params.email }, function (err, invoice) {
            var costs = 0;
            invoice.forEach(element => {
                console.log(element);
                if (element.costs > 0) {
                    costs = costs + element.costs;
                }
            });

            var type = "costs"

            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Total costs retrieved successfully.",
                data: costs,
            });

            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};

exports.getPaidCosts = function (req, res) {
    mongoose.connect('mongodb://admin:Admin0@ds060749.mlab.com:60749/readinvoice', { useNewUrlParser: true });

    db = mongoose.connection;

    db.once('open', function callback() {
        Invoice.find({ email: req.params.email }, function (err, invoice) {
            var paid = 0;
            invoice.forEach(element => {
                console.log(element);
                if (element.costs < 0) {
                    paid = paid - element.costs;
                }
            });

            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: "Total payment retrieved successfully.",
                data: paid,
            });

            mongoose.connection.close();
            mongoose.disconnect();
        });
    });
};