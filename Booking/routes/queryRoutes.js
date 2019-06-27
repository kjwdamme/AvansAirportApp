let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to bookings',
    });
});

var bookingController = require('../controllers/queryController');

router.route('/bookings')
    .get(bookingController.index);

router.route('/bookings/:booking_id')
    .get(bookingController.view);
 
    module.exports = router;