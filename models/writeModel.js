var mongoose = require('mongoose');

var bordersecuritySchema = mongoose.Schema({
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
        flightID: {
            type: Number,
            required: true
        },
});

var WriteModel = module.exports = mongoose.model('writeModel', bordersecuritySchema);

module.exports.get = function (callback, limit) {
    WriteModel.find(callback).limit(limit);
}