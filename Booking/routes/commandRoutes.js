let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to bookings',
    });
});

var commandController = require('../controllers/commandController');

router.route('/bookings')
    .post(commandController.new);
 
    module.exports = router;