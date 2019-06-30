var mongoose = require('mongoose');

var securitySchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

var WriteModel = module.exports = mongoose.model('writeModel', securitySchema);
