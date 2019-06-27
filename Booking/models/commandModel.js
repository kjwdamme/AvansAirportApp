var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({
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

var CommandModel = module.exports = mongoose.model('commandModel', commandSchema);