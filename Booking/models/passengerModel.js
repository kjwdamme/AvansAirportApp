var mongoose = require('mongoose');

var passengerSchema = mongoose.Schema({
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
    }
});

var passengerSchema = module.exports = mongoose.model('passengerModel', passengerSchema);