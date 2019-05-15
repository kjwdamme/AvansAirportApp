const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FlightModel = require('./flight.model');
const PassengerModel = require('./passenger.model');

const CheckInModel = new Schema({
    passenger: PassengerModel,
    flight: FlightModel,
    checkedIn: {
        type: Buffer
    },
    checkedInDate: {
        type: Date,
        default: Date.now
    }
});


var CheckIn = module.exports = mongoose.model('checkin', CheckInModel);
module.exports.get = function(callback, limit) {
    CheckIn.find(callback).limit(limit)
}