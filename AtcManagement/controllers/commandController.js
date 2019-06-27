ATC = require('../models/commandModel');
var mongoose = require("mongoose");

exports.new = function (req, res) {
    mongoose.connect('mongodb://Admin:Password123@ds343217.mlab.com:43217/writeatc', { useNewUrlParser: true });
   

    var db = mongoose.connection;

    db.once('open', function callback() {
        var atc = new ATC();

 
        atc.flight = req.body.flight;
        atc.landingstrip = req.body.landingstrip;
        atc.permission = req.body.permission;

        atc.save(function (err) {
            res.json({
                message: 'New atc created!',
                data: atc
            });

            mongoose.connection.close();
            mongoose.disconnect();

        });
    });
};
