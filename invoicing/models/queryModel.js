var mongoose = require('mongoose');

var invoiceSchema = mongoose.Schema({
    FlightID: {
        type: Number,
        required: true
    },
    Passenger: [{
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        },
        Age: {
            type: String,
            required: true
        },
        Gender: {
            type: String,
            required: true
        },
        BaggageKG: {
            type: Number,
            required: true
        },
    }],
    Email: {
        type: String,
        required: true
    }
});

var QueryModel = module.exports = mongoose.model('queryModel', invoiceSchema);

module.exports.get = function (callback, limit) {
    QueryModel.find(callback).limit(limit);
}