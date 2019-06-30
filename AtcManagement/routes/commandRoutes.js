let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to ATC',
    });
});

var commandController = require('../controllers/commandController');

router.route('/atcs')
    .post(commandController.new);
 
    module.exports = router;