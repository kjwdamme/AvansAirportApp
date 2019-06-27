const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandModel = new Schema({
    passenger: [{
        passengerId: {
            type: Number,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        baggageKG: {
            type: Number,
            required: true
        }
    }],
    flight: [{
        PlaneId: {
            type: Number,
        },
        AirlineId: {
            type: Number,
        },
        DepartureDate: {
            type: Date,
        },
        Delay: {
            type: Number,
        },
        Destination: {
            type: String,
        },
        IsArriving: {
            type: Buffer,
        }
    }],
    checkedIn: {
        type: Buffer
    },
    checkedInDate: {
        type: Date,
        default: Date.now
    }
});

var CommandModel = module.exports = mongoose.model('commandModel', commandModel);

module.exports.get = function (callback, limit) {
    CommandModel.find(callback).limit(limit)
}