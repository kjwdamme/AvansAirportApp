BorderSecurityModel = require('../models/writeModel');
var mongoose = require('mongoose');

exports.new = function (req, res) {
    mongoose.connect('mongodb://User:User123@ds026658.mlab.com:26658/bordersecurity_write', { useNewUrlParser: true });

    var db = mongoose.connection;

    db.once('open', function callback() {
        var borderSecurityModel = new BorderSecurityModel();

        borderSecurityModel.firstName = req.body.firstName;
        borderSecurityModel.lastName = req.body.lastName;
        borderSecurityModel.age = req.body.age;
        borderSecurityModel.gender = req.body.gender;
        borderSecurityModel.flightID = req.body.flightID;

        borderSecurityModel.save(function (err) {
            res.json({
                message: 'New BorderSecurityModel created!',
                data: borderSecurityModel
            });

            mongoose.connection.close();
            mongoose.disconnect();

        });
    });
};