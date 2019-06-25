const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandModel = new Schema({
    passenger: [{
        PassengerId: {
            type: Number,
        },
        Name: {
            type: String,
        },
        Surname: {
            type: String,
        },
        Birthdate: {
            type: Date,
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