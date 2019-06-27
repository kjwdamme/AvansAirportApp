var mongoose = require('mongoose');

var bordersecuritySchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

var ReadModel = module.exports = mongoose.model('readModel', bordersecuritySchema);

module.exports.get = function (callback, limit) {
    ReadModel.find(callback).limit(limit);
}