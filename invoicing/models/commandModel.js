var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({
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

var CommandModel = module.exports = mongoose.model('commandModel', commandSchema);