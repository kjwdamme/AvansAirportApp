Invoice = require('../models/invoiceModel');

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