let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to bookings',
    });
});

var queryController = require('../controllers/queryController');

router.route('/bookings')
    .get(queryController.index);

router.route('/bookings/:booking_id')
    .get(queryController.viewByID);

router.route('/bookings/email/:email')
    .get(queryController.viewByEmail);

router.route('/bookings/flightstatus/:flightID')
    .get(queryController.viewFlightStatus);

module.exports = router;