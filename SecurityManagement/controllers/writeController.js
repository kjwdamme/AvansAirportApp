WriteModel = require('../models/writeModel');
var mongoose = require('mongoose');

exports.new = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds038319.mlab.com:38319/security_write', { useNewUrlParser: true });

    var db = mongoose.connection;

    db.once('open', function callback() {
        var writeModel = new WriteModel();

        writeModel.message = req.body.message;

        writeModel.save(function (err) {
            res.json({
                message: 'New WriteModel created!',
                data: writeModel
            });

            mongoose.connection.close();
            mongoose.disconnect();

        });
    });
};