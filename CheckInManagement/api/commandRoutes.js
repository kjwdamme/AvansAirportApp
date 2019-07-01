let router = require('express').Router();
var commandController = require('../controllers/commandController');

router.get('/', function (req, res) {
    res.json({
        id: '01',
        description: 'Test object',
    });
});

router.route('/checkins')
    .post(commandController.new);

router.route('/checkins/:id')
    .post(commandController.checkin);

module.exports = router;