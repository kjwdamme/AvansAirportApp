var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({
    flight: [{
        planeId: {
            type: Number
        },
        airlineId: {
            type: Number,
        },
        planeName:{
            type: String
        },
        departureDate: {
            type: Date,
        },
        durationMinutes:{
            type: Number
        },
        delayMinutes: {
            type: Number,
        },
        destination: {
            type: String,
        }
    }],
    landingstrip: {
        type: Number
    },
    permission:{
        type: Boolean
    }


});

var CommandModel = module.exports = mongoose.model('commandModel', commandSchema);

module.exports.get = function (callback, limit) {
    CommandModel.find(callback).limit(limit);
}