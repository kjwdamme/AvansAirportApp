var mongoose = require('mongoose');

var commandSchema = mongoose.Schema({
    flight: [{
        id:{
            type: Number
        },
        planeId: {
            type: Number
        },
        airlineId: {
            type: Number,
        },
        airlineModel:{
            type: String,
        },
        planeModel:{
            type: String
        },
        planeName:{
            type: String
        },
        departureDate: {
            type: Date,
        },
        arrivalDate: {
            type: Date
        },
        durationMinutes:{
            type: Number
        },
        delayMinutes: {
            type: Number,
        },
        destination: {
            type: String,
        },
        isArriving: {
          type: Boolean,
        } 
    }],
    landingstrip: {
        type: Number
    },
    permisssion:{
        type: Boolean
    }


});

var CommandModel = module.exports = mongoose.model('commandModel', commandSchema);

module.exports.get = function (callback, limit) {
    CommandModel.find(callback).limit(limit);
}