var mongoose = require('mongoose');

var invoiceSchema = mongoose.Schema({
    flightID: {
        type: Number,
        required: true
    },
    passenger: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        baggageKG: {
            type: Number,
            required: true
        },
    }],
    email: {
        type: String,
        required: true
    },
    costs: {
        type: Number,
        required: true
    }
});

var QueryModel = module.exports = mongoose.model('queryModel', invoiceSchema);

module.exports.get = function (callback, limit) {
    QueryModel.find(callback).limit(limit);
}