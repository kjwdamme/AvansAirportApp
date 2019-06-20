let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API is online',
        message: 'Welcome to invoices',
    });
});

var commandController = require('../controllers/commandController');

router.route('/invoices')
    .post(commandController.new);
 
    module.exports = router;