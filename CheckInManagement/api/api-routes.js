let router = require('express').Router();
let express = require('express');
let flight = require('../models/flight.model');
let passenger = require('../models/passenger.model');
let checkin = require('../models/checkin.model');
// const mongodb = require('../config/mongo.db')

var checkInController = require('../controllers/checkinController');

router.get('/', function(req, res) {
    res.json({
        id: '01',
        description: 'Test object',
     });
});

// doesnt work yet
// router.get('/flight', function(req, res) {
//     res.contentType('application/json');
//     flight.find({})
//         .then((flight) => {
//         res.status(200).json(flight);
//     })
//     .catch((error) => res.status(400).json(error));
// });

router.route('/checkin')
    .get(checkInController.index)
    .post(checkInController.new);

module.exports = router;