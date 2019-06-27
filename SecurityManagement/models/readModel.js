var mongoose = require('mongoose');

var securitySchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

var ReadModel = module.exports = mongoose.model('readModel', securitySchema);

module.exports.get = function (callback, limit) {
    ReadModel.find(callback).limit(limit);
}