CheckIn = require('../models/checkin.model');

exports.index = function (req, res) {
    CheckIn.get(function (err, checkin) {
        if(err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'succes',
            message: 'succesfully retrieved',
            data: checkin
        });
    });
};

exports.new = function(req, res) {
    var checkin = new CheckIn();
    checkin.checkedIn = req.body.checkedIn ? req.body.checkedIn : checkin.checkedIn;
    checkin.checkedInDate = req.body.checkedInDate;
    checkin.save(function (err) {
        res.json({
            message: 'new checkin',
            data: checkin
        });
    });
};

