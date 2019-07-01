var mongoose = require('mongoose');

var ATCSchema = mongoose.Schema({
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

var QueryModel = module.exports = mongoose.model('queryModel', ATCSchema);

module.exports.get = function (callback, limit) {
    QueryModel.find(callback).limit(limit);
}