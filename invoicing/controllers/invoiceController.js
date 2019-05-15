Invoice = require('../models/invoiceModel');

exports.index = function (req, res) {
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
    });
};

exports.new = function (req, res) {
    var invoice = new Invoice();
    invoice.name = req.body.name ? req.body.name : invoice.name;
    invoice.gender = req.body.gender;
    invoice.email = req.body.email;
    invoice.phone = req.body.phone;
    invoice.save(function (err) {
        res.json({
            message: 'New invoice created!',
            data: invoice
        });
    });
};

exports.view = function (req, res) {
    Invoice.findById(req.params.invoice_id, function (err, invoice) {
        if (err)
            res.send(err);
        res.json({
            message: 'Invoice details loading..',
            data: invoice
        });
    });
};

exports.update = function (req, res) {
    Invoice.findById(req.params.invoice_id, function (err, invoice) {
        if (err)
            res.send(err);
        invoice.name = req.body.name ? req.body.name : invoice.name;
        invoice.gender = req.body.gender;
        invoice.email = req.body.email;
        invoice.phone = req.body.phone;
        invoice.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Invoice Info updated',
                data: invoice
            });
        });
    });
};

exports.delete = function (req, res) {
    Invoice.remove({
        _id: req.params.invoice_id
    }, function (err, invoice) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Invoice deleted'
        });
    });
};