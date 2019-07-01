ATC = require('../models/commandModel');
var mongoose = require("mongoose");
const env = require('../config/env');
const axios = require('axios');

exports.new = function (req, res) {
    mongoose.connect(env.env.mongoWritehost, { useNewUrlParser: true })
    var db = mongoose.connection;

    db.once('open', function callback() {
        axios.get('http://flightmanagement:5001/api/flights/' + req.params.flightId)
            .then(response => {
                var atc = new ATC()

                atc.flight = [{
                    planeId: response.data.planeModel.id,
                    airlineId: response.data.airlineModel.id,
                    planeName: response.data.planeModel.name,
                    departureDate: response.data.departureDate,
                    durationMinutes: response.data.durationMinutes,
                    delayMinutes: response.data.delayMinutes,
                    destination: response.data.destination
                }],
                    atc.landingstrip = Math.floor(Math.random() * 8) + 1,
                    atc.permission = req.body.permission;

                atc.save(function (err) {
                    res.json({
                        message: 'New atc created!',
                        data: atc
                    });

                    mongoose.connection.close();
                    mongoose.disconnect();

                });
            })
            .catch(error => {
                console.log(error);
            });
    });
}
