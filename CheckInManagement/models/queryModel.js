const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queryModel = new Schema({
    passenger: [{
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
        PlaneName: {
            type: String,
        },
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
        }
    }],
    email: {
        type: String,
        required: true
    },
    checkedIn: {
        type: Boolean
    },
    checkedInDate: {
        type: Date,
        default: Date.now
    }
});

var QueryModel = module.exports = mongoose.model('queryModel', queryModel);

module.exports.get = function(callback, limit) {
    QueryModel.find(callback).limit(limit)
}