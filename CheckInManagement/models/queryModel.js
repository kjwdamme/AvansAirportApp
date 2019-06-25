const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queryModel = new Schema({
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

var QueryModel = module.exports = mongoose.model('queryModel', queryModel);

module.exports.get = function(callback, limit) {
    QueryModel.find(callback).limit(limit)
}