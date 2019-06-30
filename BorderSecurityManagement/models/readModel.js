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
        }
});

var ReadModel = module.exports = mongoose.model('BorderSecurityModel', bordersecuritySchema);

module.exports.get = function (callback, limit) {
    ReadModel.find(callback).limit(limit);
}