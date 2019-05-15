var mongoose = require('mongoose');

var invoiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Invoice = module.exports = mongoose.model('invoice', invoiceSchema);

module.exports.get = function (callback, limit) {
    Invoice.find(callback).limit(limit);
}