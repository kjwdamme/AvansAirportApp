Invoice = require('../models/queryModel');

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

exports.view = function (req, res) {
    queryInvoice.findById(req.params.invoice_id, function (err, invoice) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: "Invoice retrieved successfully",
            data: invoice
        });
    });
};